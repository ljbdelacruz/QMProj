import { StatusTypeReferenceVM } from "../statusTypeService/model.model";
import { ImageLinkStorageVM } from "../imageLinkStorageService/model.model";
import { LocationStorageVM } from "../locationServices/model.model";

//#region MyStore
export class MyStoreVM{
    public ID:string;
    public UserID:string;
    public Name:string;
    public StoreCategory:StatusTypeReferenceVM;
    public StoreBackgroundImage:ImageLinkStorageVM;
    public StoreLogo:ImageLinkStorageVM;
    constructor(){this.empty();}
    empty(){
        this.ID="";
        this.UserID="";
        this.Name="";
        this.StoreCategory=new StatusTypeReferenceVM();
        this.StoreBackgroundImage=new ImageLinkStorageVM();
        this.StoreLogo=new ImageLinkStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.Name=object.Name;
            this.StoreCategory.set(object.StoreCategory);
            this.StoreBackgroundImage.set(object.StoreBackgroundImage);
            this.StoreLogo.set(object.StoreLogo);
        }
    }
}
//#endregion
//#region StoreBranch
export class StoreBranchVM{
    public ID:string;
    public StoreID:string;
    public AttendantID:string;
    public Geolocation:LocationStorageVM;
    public Address:string;
    constructor(){this.empty();}
    empty(){
        this.ID="";
        this.StoreID="";
        this.AttendantID="";
        this.Geolocation=new LocationStorageVM();
        this.Address="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.StoreID=object.StoreID;
            this.AttendantID=object.AttendantID;
            this.Geolocation.set(object.Geolocation);
            this.Address=object.Address;
        }
    }
}
//#endregion


