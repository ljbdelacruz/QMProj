import { StatusTypeReferenceVM } from "../statusTypeService/model.model";
import { ImageLinkStorageVM } from "../imageLinkStorageService/model.model";
import { DateTimeStorageVM } from "../dateTimeAPI/model.model";

//#region UsersViewModel
export class UsersViewModel{
    public ID:string;
    public Firstname:string;
    public Middlename:string;
    public Lastname:string;
    public EmailAddress:string;
    public ContactNumber:string;
    public Password:string;
    public Repassword:string;
    public Address:string;
    public isClient:boolean;
    public CompanyID:string;
    public ProfileImage:ImageLinkStorageVM;
    constructor(){
        this.empty();
    }
    set(object){
        if(object != null || object != undefined){
            this.ID=object.ID;
            this.Firstname=object.Firstname;
            this.Middlename=object.MiddleName;
            this.Lastname=object.Lastname;
            this.EmailAddress=object.EmailAddress;
            this.ContactNumber=object.ContactNumber;
            this.isClient=object.isClient;
            this.CompanyID = object.Member!=null?object.Member.ID:null;
            this.ProfileImage.set(object.ProfileImage);
        }
    }
    setFB(object){
        if(object!=null){
            this.Firstname=object.Firstname;
            this.Lastname=object.Lastname;
            this.ProfileImage=object.ProfileImage;
            this.Password="facebookGEO";
            this.EmailAddress=object.EmailAddress;
        }
    }
    empty(){
        this.ID="";
        this.Firstname="";
        this.Middlename="";
        this.Lastname="";
        this.EmailAddress="";
        this.ContactNumber="";
        this.Password="";
        this.Repassword="";
        this.Address="";
        this.isClient=true;
        this.ProfileImage=new ImageLinkStorageVM();
    }
}
//#endregion
//#region UserAccessLevel
export class UserAccessLevelVM{
    public ID:string;
    public UserID:string;
    public AccessLevel:StatusTypeReferenceVM;
    public DateTimeData:DateTimeStorageVM;
    constructor(){
        this.empty();
    }
    set(object:any){
        if(object!=null){
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.AccessLevel.set(object.AccessLevel);
            this.DateTimeData.set(object.DateTimeData);
        }
    }
    setM(id:string, uid:string){
        this.ID=id;
        this.UserID=uid;
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.AccessLevel=new StatusTypeReferenceVM();
        this.DateTimeData=new DateTimeStorageVM();
    }
}
//#endregion
//#region AccessLevel
export class AccessLevelVM{
    public Name:string;
    constructor(){
        this.Name="";
    }
    set(object){
        if(object !=null){
          this.Name=object.Name;
        }
    }
    empty(){
        this.Name="";
    }
}
//#endregion

