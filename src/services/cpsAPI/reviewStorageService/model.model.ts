import { DateTimeStorageVM } from "../dateTimeAPI/model.model";

//#region ReviewStorage
export class ReviewStorageVM{
    public ID:string;
    public SenderID:string;
    public Title:string;
    public Comment:string;
    public Stars:number;
    public DateTime:DateTimeStorageVM;
    constructor(){this.empty()}
    empty(){
        this.ID="";
        this.SenderID="";
        this.Title="";
        this.Comment="";
        this.Stars=0;
        this.DateTime=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.SenderID=object.SenderID;
            this.Title=object.Title;
            this.Comment=object.Comment;
            this.Stars=object.Stars;
            this.DateTime.set(object.DateTime);
        }
    }

}

//#endregion