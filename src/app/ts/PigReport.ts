export class PigReport{
  key: string | undefined;
  reporter: Person;
  time: number | undefined;
  pigInfo: Pig;
  location: PigLocation;
  status: Status;
  notes: String;


  constructor(reporter:Person, pigInfo:Pig, location:PigLocation,status:  Status, notes:String){
    this.generateReportID();
    this.generateTime();
    this.reporter = reporter;
    this.pigInfo = pigInfo;
    this.location = location;
    this.status = status;
    this.notes = notes;
  }

  private generateReportID() {
    this.key = Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  private generateTime() {
    this.time = Date.now();
  }
}

export enum Status{
  retrieved= "Retrieved",
  readyPickup = "Ready for Pickup"
}



export class Person{
  name : String;
  phoneNumber : number;

  constructor(name:String, phoneNumber: number) {
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}
export class Pig{
  pigID : number;
  pigBreed : String | null;

  constructor(pigID:number, pigBreed:String){
    this.pigID = pigID;
    this.pigBreed = pigBreed;
  }
}
export class PigLocation{
  longitude: number;
  latitude : number;
  name : String;


  constructor(longitude: number, latitude: number, name: String) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.name = name;
  }

  ladLong():[number,number]{
    return [this.latitude, this.longitude];
  }
}
