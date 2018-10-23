import { DateTimeStorageVM } from "../dateTimeAPI/model.model";
import { StatusTypeReferenceVM } from "../statusTypeService/model.model";

//#region MessagingRoomVM
export class MessagingRoomVM{
    public ID:string;
    public Name:string;
    public OwnerID:string;
    public API:string;
    public DateTime:DateTimeStorageVM;
    constructor(){ this.empty(); }
    empty(){
        this.ID="";
        this.Name="";
        this.OwnerID="";
        this.API="";
        this.DateTime=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Name=object.Name;
            this.OwnerID=object.OwnerID;
            this.API=object.API;
            this.DateTime.set(object.DateTime);
        }
    }
}
//#endregion

//#region MessagingConversationVM
export class MessagingConversationVM{
    public ID:string;
    public Text:string;
    public MessageType:StatusTypeReferenceVM;
    public SenderID:string;
    public RoomID:string;
    public DateTime:DateTimeStorageVM;
    constructor(){}
    empty(){
        this.ID="";
        this.Text="";
        this.MessageType=new StatusTypeReferenceVM();
        this.SenderID="";
        this.RoomID="";
        this.DateTime=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Text=object.Text;
            this.MessageType.set(object.MessageType);
            this.SenderID=object.SenderID;
            this.RoomID=object.RoomID;
            this.DateTime.set(object.DateTime);
        }
    }
}
//#endregion
