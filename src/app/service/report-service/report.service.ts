import {Injectable} from '@angular/core';
import {PigReport} from "../../ts/PigReport";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import "blueimp-md5";
import {Browser} from "leaflet";
import win = Browser.win;
import md5 from "blueimp-md5";


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
  newPigReportSource = new Subject<PigReport>();
  newPigReportChanges$ = this.newPigReportSource.asObservable()
  deletedPigReportSource = new Subject<PigReport>();
  deletedPigReportChanges$ = this.deletedPigReportSource.asObservable()





  getReport(){
    console.log(`Reports generated`);
    return this.http.get<Data>('https://272.selfip.net/apps/yw1CIgsa3G/collections/pigs/documents/?format=json')

    }


  deleteReport(report:PigReport): void{
    console.log(`Report was sent for deletion`);
    let windowPrompt = window.prompt("Type in password");
    {
        if (md5(windowPrompt!) == `84892b91ef3bf9d216bbc6e88d74a77c`) {
          this.http.delete(this.url + report.key).subscribe((data: any) => {
            console.log(data);
          });
          this.deletedPigReportSource.next(report);
        }else{
        window.alert(`Wrong password. Please try again`)}
      }
  }

  addNewReport(report:PigReport) : void{
    console.log(`Report added:`);
    let windowPrompt = window.prompt("Type in password");
    console.log(`api.hashify.net/hash/md5/hex?value=${windowPrompt}`);
    {
        if (md5(windowPrompt!) == `84892b91ef3bf9d216bbc6e88d74a77c`) {
          this.newPigReportSource.next(report);
          console.log(report);
          this.http.post<Data>(this.url,
            {'key':report.key, 'data':report}).subscribe((data:any)=>{
              console.log(data);})
        }
        else{
          window.alert(`Wrong password. Please try again`)}
      }
    }
}
