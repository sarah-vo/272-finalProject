import { Component , AfterViewInit} from '@angular/core';
import {Pig,PigReport,PigLocation,Person} from './ts/PigReport'

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

  ngOnInit(){
      this.pigReports =[
        new PigReport(new Person("Sarah",0),new Pig(123,"Hock"),new PigLocation(-122.915667,49.278931,"SFU Burnaby"),""),
        new PigReport(new Person("Sarah",0),new Pig(123,"Hock"),new PigLocation(-122.915667,49.278931,"SFU Burnaby"),""),
        new PigReport(new Person("Sarah",0),new Pig(281,"Hock"),new PigLocation( -123.100208,49.277420,"Downtown"),""),
        new PigReport(new Person("Sarah",0),new Pig(135,"Hock"),new PigLocation( -123.100208,49.277420,"Downtown"),""),
        new PigReport(new Person("Sarah",0),new Pig(165,"Hock"),new PigLocation( -123.100208,49.277420,"Downtown"),""),
      ]
  }
}
