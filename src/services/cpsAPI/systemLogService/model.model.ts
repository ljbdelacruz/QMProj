
//#region SystemLogs
export class SystemLogsVM{
    public ID:string;
    public Description:string;
    public OwnerID:string;
    constructor(){this.empty()}
    empty(){
        this.ID="";
        this.Description="";
        this.OwnerID="";
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Description=object.Description;
            this.OwnerID=object.OwnerID;
        }
    }


}
//#endregion


