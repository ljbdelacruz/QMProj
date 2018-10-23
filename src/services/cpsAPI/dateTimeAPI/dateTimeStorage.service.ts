import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {SecurityGeneratorService} from '../securityGeneratorService/securityGenerator.service'
@Injectable()
export class DateTimeStorageService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private scgS:SecurityGeneratorService){
        this.headers=new Headers();
    }
    
    //#region Post
    GetTZ(tz:string, success, failed){
        var body=new FormData();
        body.append("tz", tz);
        this.rs.SimplifyPost(this.gser.cpsURL+"DateTimeStorage/DSGetTZ", this.headers, body, success.bind(this), failed.bind(this))
    }
    Insert(id:string, oid:string, aid:string, ca:string, ua:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("ca", ca);
        body.append("ua", ua);
        this.rs.SimplifyPost(this.gser.cpsURL+"DateTimeStorage/DSInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertTZ(id:string, oid:string, aid:string, tz:string, cid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("tz", tz);
        body.append("cid", cid);
        this.rs.SimplifyPost(this.gser.cpsURL+"DateTimeStorage/DSInsertTZ", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertNew(oid:string, aid:string, cid:string, tz:string, success, failed){
        this.scgS.GetID(function(id){
            this.InsertTZ(id, oid, aid, tz, cid, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }


    Remove(id:string, aid:string, oid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        body.append("oid", oid);
        this.rs.SimplifyPost(this.gser.cpsURL+"DateTimeStorage/DSRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, oid:string, aid:string, ca:string, ua:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("ca", ca);
        body.append("ua", ua);
        this.rs.SimplifyPost(this.gser.cpsURL+"DateTimeStorage/DSUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetTimeByTimeZone(tz:string, success, failed){
        var body=new FormData();
        body.append("tz", tz);
        this.rs.SimplifyPost(this.gser.cpsURL+"DateTimeStorage/DSGetTimeByTZ", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"DateTimeStorage/DSGetByOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    Get(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"DateTimeStorage/DSGet?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }

    //#endregion
    //#region Util  
    //functions
    // MToVM(object, success){
    //     var item=new UsersViewModel();
    //     item.set(object);
    //     success(item);
    // }
    // MsToVMs(list, success){
    //     var index=0;
    //     var nlist:UsersViewModel[]=[];
    //     if(list.length > 0){
    //         list.forEach(el => {
    //             this.MToVM(el, function(resp){
    //                 nlist.push(resp);
    //                 index++;
    //                 if(index==list.length-1){
    //                     success(nlist);
    //                 }
    //             }.bind(this))
    //         });
    //     }else{
    //         success(nlist);
    //     }
    // }
    //#endregion
    
}
