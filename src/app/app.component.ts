import {Component, EventEmitter, Output} from '@angular/core';
import {PigReport} from './ts/PigReport'
import {Data, ReportService} from "./service/report-service/report.service";
import 'reflect-metadata';
import {plainToClass} from "class-transformer";

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
    let rp:PigReport | undefined;
    this.reportService.newPigReportChanges$.subscribe((data:PigReport)=>{
      rp =  data;
      console.log(`before push:`);
      console.log(this.pigReports);
      this.pigReports!.push(rp!);
      console.log(this.pigReports);
      this.newPigReport = rp;
    })
  }


  subscribeDeletedPig(){

    let rp: PigReport | undefined;
    this.reportService.deletedPigReportChanges$.subscribe((data:PigReport)=>{
      rp =  data;
      this.pigReports = this.pigReports!.filter((report)=> report.key != rp!.key);
      this.deletedPigReport = rp;
    })
  }


  constructor(private reportService: ReportService) {
  }

  ngOnInit(){
    this.reportService.getReport().subscribe((data:any) =>{
        this.pigReports = (data.map((obj: Data) => plainToClass(PigReport, obj.data)));
      });
    this.subscribeNewPig();
    this.subscribeDeletedPig()
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
