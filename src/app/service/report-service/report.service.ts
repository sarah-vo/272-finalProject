import {Injectable} from '@angular/core';
import {PigReport} from "../../ts/PigReport";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export interface Data{
  key: string;
  data: PigReport;
}


@Injectable({
  providedIn: 'root'
})


export class ReportService {

  constructor(private http: HttpClient) { }
  reports : PigReport[] = [];
  url = `https://272.selfip.net/apps/yw1CIgsa3G/collections/pigs/documents/`;
  newPigReport = new Observable<PigReport>;
  deletedPigReport = new Observable<PigReport>;




  getReport(){
    console.log(`Reports generated`);
    return this.http.get<Data>('https://272.selfip.net/apps/yw1CIgsa3G/collections/pigs/documents/?format=json')

    }


    // return [
    //   new PigReport(new Person("Sarah",0),new Pig(123,"Hock"),new PigLocation(-122.915667,49.278931,"SFU Burnaby"),Status.readyPickup, ""),
    //   new PigReport(new Person("Darren",0),new Pig(123,"Hock"),new PigLocation(-122.915667,49.278931,"SFU Burnaby"),Status.readyPickup, ""),
    //   new PigReport(new Person("Darrick",0),new Pig(123,"Hock"),new PigLocation(-122.915667,49.278931,"SFU Burnaby"),Status.readyPickup, ""),
    //   new PigReport(new Person("John",0),new Pig(123,"Hock"),new PigLocation(-122.915667,49.278931,"SFU Burnaby"),Status.readyPickup, ""),
    //   new PigReport(new Person("Timothy",0),new Pig(145,"Hock"),new PigLocation(-122.915667,49.278931,"SFU Burnaby"),Status.readyPickup, ""),
    // ]

  deleteReport(report:PigReport): void{
    console.log(`Report was sent for deletion`)
    this.http.delete(this.url + report.key).subscribe((data:any)=>{
      console.log(data);
    })
  }

  addNewReport(report:PigReport) : void{
    console.log(`Report added:`);
    console.log(report);
    this.http.post<Data>(this.url,
      {'key':report.key, 'data':report}).subscribe((data:any)=>{
        console.log(data);
    })
  }
}
