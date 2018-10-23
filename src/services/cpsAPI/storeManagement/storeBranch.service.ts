import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import { StoreBranchVM } from './model.model';
@Injectable()
export class StoreBranchService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region post
    Insert(id:string, sid:string, aid:string, gid:string, address:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("aid", aid);
        body.append("gid", gid);
        body.append("address", address);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"StoreManagement/SBInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, sid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        this.rs.SimplifyPost(this.gser.cpsURL+"StoreManagement/SBRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, sid:string, aid:string, gid:string, address:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("aid", aid);
        body.append("gid", gid);
        body.append("address", address);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"StoreManagement/SBUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    
    //#region get
    GetUser(id:string, aid:string, lcid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"StoreManagement/MSGetByUser?id="+id+"&aid="+aid+"&lcid="+lcid, this.headers, success.bind(this), failed.bind(this))
    }
    GetRadius(id:string, aid:string, lcid:string, rad:string, longi:string, lat:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"StoreManagement/SBGetByRadius?id="+id+"&aid="+aid+"&lcid="+lcid+"&rad="+rad+"&longi="+longi+"&lat="+lat, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region util
    MToVM(object, success){
        var item=new StoreBranchVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:StoreBranchVM[]=[];
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
