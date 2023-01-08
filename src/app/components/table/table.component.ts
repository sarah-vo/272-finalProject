import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PigReport, Status} from "../../ts/PigReport";
import {ReportService} from "../../service/report-service/report.service";



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],

})
export class TableComponent {
  @Input() pigReports: PigReport[] | undefined;
  @Input() newPigReport : PigReport | undefined;
  @Input() deletedPigReport : PigReport | undefined;
  @Output() triggerReport=  new EventEmitter<boolean>();
  @Output() pigReportInfo = new EventEmitter<PigReport>();

  constructor(private reportService: ReportService) {
  }

  public Status = Status;
  // public StatusUtil = StatusUtil;

  triggerPigReport(report : PigReport){
    this.triggerReport.emit(true);
    this.pigReportInfo.emit(report);
  }

  deletePigReport(report:PigReport){
    this.reportService.deleteReport(report);
  }
}


