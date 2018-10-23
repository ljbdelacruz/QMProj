import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import { MyStoreVM } from './model.model';
@Injectable()
export class MyStoreService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region post
    Insert(id:string, uid:string, name:string, aid:string, scid:string, sbid:string, slid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("name", name);
        body.append("aid", aid);
        body.append("scid", scid);
        body.append("sbid", sbid);
        body.append("slid", slid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"StoreManagement/MSInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, uid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"StoreManagement/MSRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, uid:string, name:string, aid:string, scid:string, sbid:string, slid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("name", name);
        body.append("aid", aid);
        body.append("scid", scid);
        body.append("sbid", sbid);
        body.append("slid", slid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"StoreManagement/MSUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    
    //#region get
    GetUser(id:string, aid:string, ia:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"StoreManagement/MSGetByUser?id="+id+"&aid="+aid+"&ia="+ia, this.headers, success.bind(this), failed.bind(this))
    }
    GetCategory(id:string, aid:string, ia:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"StoreManagement/MSGetByCategory?id="+id+"&aid="+aid+"&ia="+ia, this.headers, success.bind(this), failed.bind(this))
    }

    //#endregion
    //#region util
    MToVM(object, success){
        var item=new MyStoreVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:MyStoreVM[]=[];
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
