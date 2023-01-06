import {Component, ElementRef, EventEmitter, NgModule, Output, ViewChild} from '@angular/core';
import {Person, Pig, PigLocation, PigReport, Status} from './ts/PigReport'
import {Data, ReportService} from "./service/report-service/report.service";
import {ReactiveFormsModule} from "@angular/forms";
import 'reflect-metadata';
import {deserialize, plainToClass} from "class-transformer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'finalAssignment';
  pigReports : PigReport[] | undefined;
  newPigReport: PigReport | undefined;
  deletedPigReport: PigReport | undefined;
  @Output() triggerNewReport=  new EventEmitter<boolean>();

  reportForShow: PigReport | undefined;
  showReportDrawer:boolean = false;
  showReportCreate:boolean = false;

  subscribeNewPig(){
    let rp;
    this.reportService.newPigReport.subscribe((data:PigReport)=>{
      rp =  data;
    })
    return rp;
  }


  subscribeDeletedPig(){
    let rp;
    this.reportService.deletedPigReport.subscribe((data:PigReport)=>{
      rp =  data;
    })
    return rp;
  }


  constructor(private reportService: ReportService) {
  }

  ngOnInit(){
    this.reportService.getReport().subscribe((data:any) =>{
        this.pigReports = (data.map((obj: Data) => plainToClass(PigReport, obj.data)));
      })
  }

  showReport(report: PigReport){
    this.reportForShow = report;
    this.showReportDrawer = true;
  }

  showCreateReport(){
    this.showReportCreate = true;
  }

  disableDrawer = () =>{
    this.showReportDrawer = false;
    this.showReportCreate = false;
  }

}
