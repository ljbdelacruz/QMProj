import { StatusTypeReferenceVM } from "../statusTypeService/model.model";
import { DateTimeStorageVM } from "../dateTimeAPI/model.model";
//#region ReportClaims
export class ReportClaimsVM{
    public ID:string;
    public UserID:string;
    public SenderUserID:string;
    public Reason:string;
    public ReportType:StatusTypeReferenceVM;
    public DateTime:DateTimeStorageVM;
    constructor(){this.empty()}
    empty(){
        this.ID="";
        this.UserID="";
        this.SenderUserID="";
        this.Reason="";
        this.ReportType=new StatusTypeReferenceVM();
        this.DateTime=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.SenderUserID=object.SenderUserID;
            this.Reason=object.Reason;
            this.ReportType.set(object.ReportType);
            this.DateTime.set(object.DateTime);
        }
    }
}
//#endregion



