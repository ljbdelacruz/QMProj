import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {ReviewStorageVM} from './model.model'
@Injectable()
export class ReviewStorageService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, sid:string, rid:string, aid:string, title:string, comment:string, s:string, dtid:string, ia:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("rid", rid);
        body.append("aid", aid);
        body.append("title", title);
        body.append("comment", comment);
        body.append("s", s);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"ReviewStorage/RSInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"ReviewStorage/RSRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, sid:string, rid:string, aid:string, title:string, comment:string, s:string, dtid:string, ia:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);
        body.append("rid", rid);
        body.append("aid", aid);
        body.append("title", title);
        body.append("comment", comment);
        body.append("s", s);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"ReviewStorage/RSUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetSender(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"ReviewStorage/RCGet?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetReviewed(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"ReviewStorage/RSGetByReviewed?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    Get(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"ReviewStorage/RSGet?id="+id, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    //functions
    MToVM(object, success){
        var item=new ReviewStorageVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ReviewStorageVM[]=[];
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
