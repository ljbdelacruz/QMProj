import {StatusTypeReferenceVM} from '../statusTypeService/model.model'
import { DateTimeStorageVM } from '../dateTimeAPI/model.model';
import { ImageLinkStorageVM } from '../imageLinkStorageService/model.model';

export class IS_ItemVM{
    public ID:string;
    public Title:string;
    public Description:string;
    public Price:number;
    public OwnerID:string;
    public ItemCategory:StatusTypeReferenceVM;
    public isCount:boolean;
    public Quantity:number;
    public DateTimeStorage:DateTimeStorageVM;
    public Images:ImageLinkStorageVM[];
    
    //#region methods
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Title="";
        this.Description="";
        this.Price=0;
        this.OwnerID="";
        this.ItemCategory=new StatusTypeReferenceVM();
        this.isCount=false;
        this.Quantity=0;
        this.DateTimeStorage=new DateTimeStorageVM();
        this.Images=[];
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Title=object.Title;
            this.Description=object.Description;
            this.Price=object.Price;
            this.OwnerID=object.OwnerID;
            this.ItemCategory=object.ItemCategory;
            this.isCount=object.isCount;
            this.Quantity=object.Quantity;
            this.DateTimeStorage=object.DateTimeStorage;
            this.Images=object.Images;
        }
    }

    //#endregion

}
export class IS_ItemStockVM{
    public ID:string;
    public BarcodeNumber:string;
    public StockStatus:StatusTypeReferenceVM;
    public DateTimeStorage:DateTimeStorageVM;
    //#region methods
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.BarcodeNumber="";
        this.StockStatus=new StatusTypeReferenceVM();
        this.DateTimeStorage=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.BarcodeNumber=object.BarcodeNumber;
            this.StockStatus=object.StockStatus;
            this.DateTimeStorage=object.DateTimeStorage;
        }
    }
    //#endregion
}
export class IS_ItemColorVM{
    public ID:string;
    public Color:string;
    public Description:string;
    public Category:StatusTypeReferenceVM;
    public Images:ImageLinkStorageVM[];
    //#region methods
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Color="";
        this.Description="";
        this.Category=new StatusTypeReferenceVM();
        this.Images=[];
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Color=object.Color;
            this.Description=object.Description;
            this.Category=object.Category;
            this.Images=object.Images;
        }
    }
    //#endregion
    
}