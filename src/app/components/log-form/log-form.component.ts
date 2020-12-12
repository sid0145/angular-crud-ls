import { Component, OnInit } from "@angular/core";
import { Log } from "src/app/models/log";
import { LogService } from "src/app/services/log.service";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-log-form",
  templateUrl: "./log-form.component.html",
  styleUrls: ["./log-form.component.css"],
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNew: boolean = true;

  constructor(private logService: LogService) {}

  ngOnInit() {
    //subscribe to the observable here
    this.logService.getLogSourceListner().subscribe((log) => {
      if (log) {
        this.isNew = false;
        this.text = log.text;
        this.date = log.date;
        this.id = log.id;
      }
    });
  }

  onSubmit() {
    if (this.isNew) {
      const newLog = {
        id: uuidv4(),
        text: this.text,
        date: new Date(),
      };
      //call service to add log
      this.logService.addLog(newLog);
      this.clearState();
    } else {
      const updateLog = {
        id: this.id,
        text: this.text,
        date: new Date(),
      };

      //call service to update the log
      this.clearState();
      this.logService.updateLog(updateLog);
    }
  }

  //clear handler

  clearState() {
    this.isNew = true;
    this.id = "";
    this.text = "";
    this.date = "";
  }
}
