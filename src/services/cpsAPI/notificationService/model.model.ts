import { DateTimeStorageVM } from "../dateTimeAPI/model.model";

export class NotificationManagerVM{
    public ID:string;
    public Title:string;
    public Message:string;
    public OwnerID:string;
    public API:string;
    public DateTime:DateTimeStorageVM;
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Title="";
        this.Message="";
        this.OwnerID="";
        this.API="";
        this.DateTime=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Title=object.Title;
            this.Message=object.Message;
            this.OwnerID=object.OwnerID;
            this.API=object.API;
            this.DateTime.set(object.DateTime);
        }
    }
}