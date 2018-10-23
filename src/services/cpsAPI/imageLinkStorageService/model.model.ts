export class ImageLinkStorageVM{
    public ID:string;
    public Source:string;
    public Order:number;
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Source="";
        this.Order=0;
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Source=object.Source;
            this.Order=object.Order;
        }
    }
}