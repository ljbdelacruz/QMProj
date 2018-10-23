import { StatusTypeReferenceVM } from "../statusTypeService/model.model";
//#region PositionViewModel
export class PositionViewModel{
    longitude:number;
    latitude:number;
    constructor(){this.empty()}
    empty(){
        this.longitude=0;
        this.latitude=0;
    }
    setM(lon:number, lat:number){
        this.longitude=lon;
        this.latitude=lat;
    }
}
//#endregion
//#region LocationStorage
export class LocationStorageVM{
    public ID:string;
    public Location:PositionViewModel;
    public LocationCategory:StatusTypeReferenceVM;
    public Description:string;
    constructor(){}
    empty(){
        this.ID="";
        this.Location=new PositionViewModel();
        this.Description="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Location.setM(object.Longitude, object.Latitude);
            this.Description=object.Description;
            this.LocationCategory.set(object.LocationCategory);
        }
    }
}
//#endregion
