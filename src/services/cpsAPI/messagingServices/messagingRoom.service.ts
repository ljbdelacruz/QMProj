import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {MessagingRoomVM} from './model.model'
@Injectable()
export class MessagingRoomService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, name:string, oid:string, aid:string, dtid:string, ia:string,  success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"MessagingServices/MRInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"MessagingServices/MRRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, name:string, oid:string, aid:string, dtid:string, ia:string,  success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("name", name);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"MessagingServices/MRUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"MessagingServices/MSGetByOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    Get(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"MessagingServices/MSGet?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    MToVM(object, success){
        var item=new MessagingRoomVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:MessagingRoomVM[]=[];
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
