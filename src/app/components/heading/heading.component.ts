import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {
  @Output() createReport : EventEmitter<boolean> = new EventEmitter<boolean>();

  invokeCreateReport(){
    this.createReport.emit(true);
  }
}
