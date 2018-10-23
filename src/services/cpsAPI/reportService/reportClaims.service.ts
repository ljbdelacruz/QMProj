import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {ReportClaimsVM} from './model.model'
@Injectable()
export class ReportClaimsService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, uid:string, suid:string, rtid:string, reason:string, aid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("suid", suid);
        body.append("rtid", rtid);
        body.append("reason", reason);
        body.append("aid", aid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"ReportClaims/RCInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"ReportClaims/RCRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, uid:string, suid:string, rtid:string, reason:string, aid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("suid", suid);
        body.append("rtid", rtid);
        body.append("reason", reason);
        body.append("aid", aid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"ReportClaims/RCUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    Get(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"ReportClaims/RCGet?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    //functions
    MToVM(object, success){
        var item=new ReportClaimsVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ReportClaimsVM[]=[];
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
