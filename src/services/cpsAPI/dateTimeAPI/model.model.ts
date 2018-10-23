export class DateTimeStorageVM{
    public ID:string;
    public CreatedAtString:string;
    public CreatedAt:any;
    public UpdatedAtString:string;
    public UpdatedAt:any;
    constructor(){
        this.ID="";
        this.CreatedAtString="";
        this.UpdatedAtString="";
    }
    empty(){
        this.ID="";
        this.CreatedAtString="";
        this.UpdatedAtString="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.CreatedAtString=object.CreatedAtString;
            this.UpdatedAtString=object.UpdatedAtString;
        }
    }
    
}