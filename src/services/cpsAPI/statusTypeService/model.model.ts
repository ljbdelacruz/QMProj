export class StatusTypeReferenceVM{
    public ID:string;
    public Name:string;
    public Description:string;
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Name="";
        this.Description="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID=object.ID;
            this.Name=object.Name;
            this.Description=object.Description;
        }
    }

}