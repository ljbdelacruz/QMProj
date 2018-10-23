import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {MessagingConversationVM} from './model.model'
@Injectable()
export class MessagingConversationService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, text:string, mtid:string,sid:string, rid:string, dtid:string, ia:string,  success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("text", text);
        body.append("mtid", mtid);
        body.append("sid", sid);
        body.append("rid", rid);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"MessagingServices/MCInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, rid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("rid", rid);
        this.rs.SimplifyPost(this.gser.cpsURL+"MessagingServices/MCRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, text:string, mtid:string,sid:string, rid:string, dtid:string, ia:string,  success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("text", text);
        body.append("mtid", mtid);
        body.append("sid", sid);
        body.append("rid", rid);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"MessagingServices/MCUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetRoom(id:string, aid:string, ia:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"MessagingServices/MSGetByRoom?id="+id+"&aid="+aid+"&ia="+ia, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    //functions
    MToVM(object, success){
        var item=new MessagingConversationVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:MessagingConversationVM[]=[];
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
    //#region signalR
    NewMessageSent(rid:string, mcid:string, rmid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("rid", rid);
        body.append("mcid", mcid);
        body.append("rmid", rmid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"MessagingServices/NewMessageSent", this.headers, body, success.bind(this), failed.bind(this))
    }

    //#endregion
}
