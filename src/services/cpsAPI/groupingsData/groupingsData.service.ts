import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
@Injectable()
export class GroupingsDataService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, sid:string, oid:string, aid:string, order:string, dtid:string, ia:string, cid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);        
        body.append("oid", oid);
        body.append("order", order);
        body.append("dtid", dtid);
        body.append("ia", ia);
        body.append("cid", cid);
        this.rs.SimplifyPost(this.gser.cpsURL+"GroupingsData/GDInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"GroupingsData/GDRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, sid:string, oid:string, aid:string, order:string, dtid:string, ia:string, cid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("sid", sid);        
        body.append("oid", oid);
        body.append("order", order);
        body.append("dtid", dtid);
        body.append("ia", ia);
        body.append("cid", cid);
        this.rs.SimplifyPost(this.gser.cpsURL+"GroupingsData/GDUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"GroupingsData/GDGetByOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetCategory(id:string, cid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"GroupingsData/GDGetByCategory?id="+id+"&cid="+cid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
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
