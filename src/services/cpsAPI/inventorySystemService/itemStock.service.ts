import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import { IS_ItemStockVM } from './model.model';
@Injectable()
export class IS_ItemStockService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, bcode:string, iid:string, ssid:string, dtid:string,  success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("bcode", bcode);
        body.append("iid", iid);
        body.append("ssid", ssid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/ISInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, iid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("iid", iid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/ISRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, bcode:string, iid:string, ssid:string, dtid:string,  success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("bcode", bcode);
        body.append("iid", iid);
        body.append("ssid", ssid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/ISUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region get
    GetByItemID(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/ISGetByItem", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByItemIDVM(id:string, aid:string, success, failed){
        this.GetByItemID(id, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    Get(id:string, aid:string, iid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/ISGetByID", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetVM(id:string, aid:string, iid:string, success, failed){
        this.Get(id, aid, iid, function(data){
            this.MToVM(data, success.bind(this))            
        }.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util  
    MToVM(object, success){
        var item=new IS_ItemStockVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:IS_ItemStockVM[]=[];
        if(list.length > 0){
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length-1){
                        success(nlist);
                    }
                }.bind(this))
            });
        }else{
            success(nlist);
        }
    }
    //#endregion
    
}
