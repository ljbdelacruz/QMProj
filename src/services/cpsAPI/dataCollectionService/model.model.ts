import { DateTimeStorageVM } from "../dateTimeAPI/model.model";

//#region EmailList
export class EmailListVM{
    public ID:string;
    public Name:string;
    public Email:string;
    public DateTime:DateTimeStorageVM;
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Name="";
        this.Email="";
        this.DateTime=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Name=object.Name;
            this.Email=object.Email;
            this.DateTime.set(object.DateTime);
        }
    }
}
//#endregion

//#region SearchInputDataVM
export class SearchInputDataVM{
    public ID:string;
    public SearchInput:string;
    public DateTime:DateTimeStorageVM;
    constructor(){this.empty()}
    empty(){
        this.ID="";
        this.SearchInput="";
        this.DateTime=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.SearchInput=object.SearchInput;
            this.DateTime.set(object.DateTime);
        }
    }
}
//#endregion




