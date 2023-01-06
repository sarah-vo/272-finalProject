import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PigReport} from "../../ts/PigReport";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  @Input() pigReport : PigReport | undefined;
  @Input() toggleViewReport :boolean = false;
  @Input() toggleCreateReport : boolean = false;
  @Output() broadcastDisableVisibility : EventEmitter<boolean> = new EventEmitter<boolean>();


  disableVisibility(){
    console.log(`hi`)
    this.toggleViewReport = false;
    this.toggleCreateReport = false;
    this.broadcastDisableVisibility.emit(true);
  }

}
