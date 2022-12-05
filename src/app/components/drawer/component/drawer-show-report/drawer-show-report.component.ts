import {Component, Input} from '@angular/core';
import {Person, Pig, PigLocation, PigReport, Status} from "../../../../ts/PigReport";

@Component({
  selector: 'app-drawer-show-report',
  templateUrl: './drawer-show-report.component.html',
  styleUrls: ['./drawer-show-report.component.css']
})
export class DrawerShowReportComponent {

  nullReport = new PigReport(
    new Person("Null",696969),
    new Pig(123,""),
    new PigLocation(12,12,""),
    Status.readyPickup,
    "");

  @Input() pigReport : PigReport = this.nullReport;


  ngOnInit(){
    if(this.pigReport === this.nullReport){
      console.log(`Pig report not initialized!`);
    }
  }

}
