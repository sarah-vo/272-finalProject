import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Person, Pig, PigLocation, PigReport} from "../ts/PigReport";

import * as leaf from "leaflet";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges{
  nullReport = new PigReport(
    new Person("Null",696969),
    new Pig(123,""),
    new PigLocation(12,12,""),
    "");
  @Input() pigReports : PigReport[] | undefined;
  @Input() newPigReport : PigReport | undefined;
  @Input() deletedPigReport : PigReport | undefined;

  map: leaf.Map| undefined;
  markerMap = new Map<PigLocation, leaf.Marker>;


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
  }

  ngAfterViewInit() {
    const initialState = { lng: -123.116226, lat: 49.246292, zoom: 12 };
    this.initMap(initialState);

  }

  ngOnChanges(changes : SimpleChanges){
    if(changes['pigReports'] && changes['pigReports'].currentValue) {
      console.log(`List of pig reports changed. You now have ${this.pigReports?.length} pig reports`)
      if (changes['newPigReport'] && changes['newPigReport'].currentValue) {
        console.log(`Adding pig: ${this.newPigReport}`)
        this.handleNewPig(this.map!, changes['newPigReport'].currentValue)
      }

      if (changes['deletedPigReport'] && changes['deletedPigReport'].currentValue) {
        console.log(`Deleting pig: ${this.deletedPigReport}`)
        this.handleDeletePig(this.map!, changes['newPigReport'].currentValue!)
      }
    }
  }

  handleNewPig(map: leaf.Map, newPigReport: PigReport) {
    if(this.markerMap.has(newPigReport.location)) return;

    let newMarker = this.generateMarker(newPigReport);
    this.markerMap.set(newPigReport.location,newMarker);

  }

  handleDeletePig(map: leaf.Map , deletedPigReport: PigReport) {
    if(!this.markerMap.has(deletedPigReport.location)){
      console.log("Location marker of pig not found!");
      return;
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
    //TODO: fix bug with reporting number of pigs within location

    // @ts-ignore
    let numPigs = 1;
    pigReports.forEach((report)=>{
      if(report.pigInfo.pigID != pigReport.pigInfo.pigID && report.location == pigReport.location) {
        ++numPigs;
      }
    })
    return new leaf.Popup().setContent(`
        <h3>${pigReport.location.name}</h3>
        <p>This location has ${numPigs} pigs reported</p>
       `)
  }

  generateMarker(pigReport: PigReport) {
    let marker = new leaf.Marker(pigReport.location.ladLong())
      .bindPopup(this.addPopup(this.pigReports!, pigReport))
      .on("click", () => {
        console.log("marker clicked")
      });
    return marker;
  }

  private initMarker(map:leaf.Map){
    if(this.pigReports == undefined){
      console.log("No location passed in! Cannot initialize marker");
      return;
    }

    this.pigReports.forEach(pigReport =>{
      if(this.markerMap?.has(pigReport.location)) return;

      let marker = this.generateMarker(pigReport);

      this.markerMap.set(pigReport.location, marker);
      marker.addTo(map);
    })
    console.log(this.markerMap);


}


}

