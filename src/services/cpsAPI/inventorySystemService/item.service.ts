import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import { IS_ItemVM } from './model.model';
@Injectable()
export class IS_ItemService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, title:string, desc:string, price:string, aid:string, oid:string, icid:string,
    ic:string, q:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("title", title);
        body.append("desc", desc);
        body.append("price", price);
        body.append("aid", aid);
        body.append("oid", oid);
        body.append("icid", icid);
        body.append("ic", ic);
        body.append("q", q);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/IIInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, aid:string, oid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        body.append("oid", oid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/IIRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, title:string, desc:string, price:string, aid:string, oid:string, icid:string,
        ic:string, q:string, dtid:string, success, failed){
            var body=new FormData();
            body.append("id", id);
            body.append("title", title);
            body.append("desc", desc);
            body.append("price", price);
            body.append("aid", aid);
            body.append("oid", oid);
            body.append("icid", icid);
            body.append("ic", ic);
            body.append("q", q);
            body.append("dtid", dtid);
            this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/IIUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetByOwner(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/IIGetByOwner", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByOwnerVM(id:string,  aid:string, success, failed){
        this.GetByOwner(id, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetOwnerC(id:string, icid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("icid", icid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/IIGetByOwnerC", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetOwnerCVM(id:string, icid:string, aid:string, success, failed){
        this.GetOwnerC(id, icid, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetCategory(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/IIGetByCategory", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetCategoryVM(id:string, aid:string, success, failed){
        this.GetCategory(id, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetContains(input:string, aid:string, lmt:string, success, failed){
        var body=new FormData();
        body.append("input", input);
        body.append("aid", aid);
        body.append("lmt", lmt);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/IIGetContains", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetContainsVM(input:string, aid:string, lmt:string, success, failed){
        this.GetContains(input, aid, lmt, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util  
    MToVM(object, success){
        var item=new IS_ItemVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:IS_ItemVM[]=[];
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
    FilterByCategory(items:IS_ItemVM[], name:string, success){
        items.filter(x=>x.ItemCategory.Name == name);
        success(name);
    }
    //#endregion

}
