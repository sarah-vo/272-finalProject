import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {PigLocation, PigReport} from "../../ts/PigReport";

import * as leaf from "leaflet";
import {ReportService} from "../../service/report-service/report.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  @Input() pigReports : PigReport[] | undefined;
  @Input() newPigReport : PigReport | undefined;
  @Input() deletedPigReport : PigReport | undefined;

  map: leaf.Map| undefined;
  markerMap = new Map<PigLocation, leaf.Marker>;

  constructor(private reportService: ReportService){}

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;




  ngOnInit() {

    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    leaf.Marker.prototype.options.icon = leaf.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    this.mapSubscribeNewReport();
    this.mapSubscribeDeletedReport();
  }

  ngAfterViewInit() {
    const initialState = { lng: -123.116226, lat: 49.246292, zoom: 12 };
    this.initMap(initialState);

  }

  mapSubscribeNewReport(){
    this.reportService.newPigReportChanges$.subscribe((data:PigReport)=>{
      this.handleNewPig(this.map!, data);
    });
  }

  mapSubscribeDeletedReport(){
    this.reportService.deletedPigReportChanges$.subscribe((data:PigReport)=>{
      this.handleDeletePig(this.map!, data);
    });
  }


  handleNewPig(map: leaf.Map, newPigReport: PigReport) {
    console.log(`handleNewPig`);
    console.log(newPigReport);
    if(this.markerMap.has(newPigReport.location)) {
      this.markerMap.get(newPigReport.location)!.getPopup()?.remove();
      this.markerMap.get(newPigReport.location)!.bindPopup(this.addPopup(this.pigReports!, newPigReport));
    }

    let newMarker = this.generateMarker(map, newPigReport);
    console.log(newMarker);
    this.markerMap.set(newPigReport.location,newMarker);

  }

  handleDeletePig(map: leaf.Map , deletedPigReport: PigReport) {
    console.log(`handleDeletePig`)
    if(!this.markerMap.has(deletedPigReport.location)){
      console.log("Location marker of pig not found!");
      return;
    }

    const count = this.pigReports?.filter((report)=> report.key === deletedPigReport.key).length;

    console.log(count);
    if(count === 1) {
      this.markerMap.get(deletedPigReport.location)?.remove();
      this.markerMap.delete(deletedPigReport.location);
    }
    this.markerMap.get(deletedPigReport.location)?.getPopup()?.remove();
    this.markerMap.get(deletedPigReport.location)?.bindPopup(this.addPopup(this.pigReports!,deletedPigReport));


  }

  private initMap(initialState: { lng: number; zoom: number; lat: number }) {
    this.map = new leaf.Map(this.mapContainer.nativeElement,{
      center: [initialState.lat, initialState.lng],
      zoom: initialState.zoom
    });

    leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);



    this.initMarker(this.map);
  }

  addPopup(pigReports: PigReport[], pigReport:PigReport) {

    // @ts-ignore
    let numPigs = 1;
    pigReports.forEach((report)=>{
      if(report.location == pigReport.location) {
        ++numPigs;
      }
    })
    return new leaf.Popup().setContent(`
        <h3>${pigReport.location.name}</h3>
        <p>This location has ${numPigs} pigs reported</p>
       `)
  }

  generateMarker(map: leaf.Map, pigReport: PigReport) {
    let marker = new leaf.Marker([pigReport.location.latitude, pigReport.location.longitude])
      .bindPopup(this.addPopup(this.pigReports!, pigReport))
      .on("click", () => {
        console.log("marker clicked")
      });
    marker.addTo(map);
    return marker;
  }

  private initMarker(map:leaf.Map){
    if(this.pigReports == undefined){
      console.log("No location passed in! Cannot initialize marker");
      return;
    }

    this.pigReports.forEach(pigReport =>{
      if(this.markerMap?.has(pigReport.location)) return;

      let marker = this.generateMarker(map, pigReport);

      this.markerMap.set(pigReport.location, marker);
    })
    console.log(this.markerMap);


}


}

