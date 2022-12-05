import {Component, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Person, Pig, PigLocation, PigReport, Status} from "../../../../ts/PigReport";
import {ReportService} from "../../../../service/report-service/report.service";

@Component({
  selector: 'app-drawer-create-report',
  templateUrl: './drawer-create-report.component.html',
  styleUrls: ['./drawer-create-report.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DrawerCreateReportComponent {
  Status = Status;
  newPigReport = new EventEmitter<PigReport>();

  constructor(private reportService:ReportService) {
  }

  pigReportForm = new FormGroup({
    reporterName : new FormControl('', [Validators.required ]),
    reporterNumber : new FormControl(0, [Validators.required, ]),
    newPigID : new FormControl(0, [Validators.required, ]),
    newPigBreed : new FormControl(''),
    locationLongitude : new FormControl(-122.915667, [Validators.required, ]),
    locationLatitude : new FormControl(49.278931, [Validators.required, ]),
    locationName : new FormControl('SFU Burnaby', [Validators.required, ]),
    status: new FormControl(Status.readyPickup, [Validators.required]),
    notes: new FormControl('')
  });

  onSubmit(){
    // this.reportService.addNewReport();
    let report = new PigReport(
      new Person(
        this.pigReportForm.value.reporterName!,
        this.pigReportForm.value.reporterNumber!,),
      new Pig(
        this.pigReportForm.value.newPigID!,
        this.pigReportForm.value.newPigBreed!
        ),
      new PigLocation(
        this.pigReportForm.value.locationLongitude!,
        this.pigReportForm.value.locationLatitude!,
        this.pigReportForm.value.locationName!
      ),
      this.pigReportForm.value.status!,
      this.pigReportForm.value.notes!
    )
    this.reportService.addNewReport(report);
    this.newPigReport.emit(report);

  }

}
