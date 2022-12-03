export class PigReport{
  reporter: Person;
  pigInfo: Pig;
  location: PigLocation;
  notes: String;

  constructor(reporter:Person, pigInfo:Pig, location:PigLocation, notes:String){
    this.reporter = reporter;
    this.pigInfo = pigInfo;
    this.location = location;
    this.notes = notes;
  }
}

export class Person{
  name : String;
  phonenumber : number;

  constructor(name:String, phonenumber: number) {
    this.name = name;
    this.phonenumber = phonenumber;
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
