import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Log } from "../models/log";

@Injectable({
  providedIn: "root",
})
export class LogService {
  logs: Log[];
  private logSource = new Subject<Log>();

  constructor() {
    this.logs = [];
  }

  //getting all logs
  getLogs(): Observable<Log[]> {
    if (localStorage.getItem("logs") === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem("logs"));
    }
    return of(
      this.logs.sort((a, b) => {
        return (b.date = a.date);
      })
    );
  }

  //updating all siblings about changes
  getLogSourceListner() {
    return this.logSource.asObservable();
  }

  //setting to the form
  setLogToForm(log: Log) {
    this.logSource.next(log);
  }

  //add new log

  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  //update log

  updateLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  //delete
  deleteLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }
}
