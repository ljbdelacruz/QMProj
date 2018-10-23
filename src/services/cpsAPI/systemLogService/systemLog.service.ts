import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import { SystemLogsVM } from './model.model';
@Injectable()
export class SystemLogService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region post
    Insert(id:string, desc:string, oid:string, aid:string, dtid:string, ia:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("desc", desc);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"SystemLog/SLInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"SystemLog/SLRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, desc:string, oid:string, aid:string, dtid:string, ia:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("desc", desc);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"SystemLog/SLUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region get
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"SystemLog/SLGetByOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }

    //#endregion
    //#region util
    MToVM(object, success){
        var item=new SystemLogsVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:SystemLogsVM[]=[];
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
