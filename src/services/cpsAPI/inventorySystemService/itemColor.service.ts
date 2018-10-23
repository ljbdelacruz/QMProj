import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import { IS_ItemColorVM } from './model.model';
@Injectable()
export class IS_ItemColorService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, color:string, desc:string, oid:string, aid:string, cid:string,  success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("color", color);
        body.append("desc", desc);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("cid", cid);
        this.rs.SimplifyPost(this.gser.cpsURL+"InventorySystem/ICInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region get

    //#endregion
    //#region Util  
    MToVM(object, success){
        var item=new IS_ItemColorVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:IS_ItemColorVM[]=[];
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
