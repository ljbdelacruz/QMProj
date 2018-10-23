import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import { NotificationManagerVM } from './model.model';
@Injectable()
export class NotificationService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, title:string, message:string, oid:string, aid:string, dtid:string, ir:string, ia:string,success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("title", title);
        body.append("message", message);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("ir", ir);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"NotificationService/NMInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"NotificationService/NMRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, title:string, message:string, oid:string, aid:string, dtid:string, ir:string, ia:string,success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("title", title);
        body.append("message", message);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("ir", ir);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"NotificationService/NMUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"NotificationService/NMGetByOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region signalR
    CheckUserNotification(id:string, aid:string, gdcid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        body.append("gdcid", gdcid);
        this.rs.SimplifyPost(this.gser.cpsURL+"NotificationService/NMCheckUserNotification", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    MToVM(object, success){
        var item=new NotificationManagerVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:NotificationManagerVM[]=[];
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
