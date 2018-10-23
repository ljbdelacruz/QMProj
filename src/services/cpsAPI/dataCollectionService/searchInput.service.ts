import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
@Injectable()
export class SearchInputService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    
    //#region Post
    Insert(id:string, input:string, oid:string, dtid:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("input", input);
        body.append("oid", oid);
        body.append("dtid", dtid);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.cpsURL+"DataCollection/SIInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"DataCollection/SIRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, input:string, oid:string, dtid:string, api:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("input", input);
        body.append("oid", oid);
        body.append("dtid", dtid);
        body.append("api", api);
        this.rs.SimplifyPost(this.gser.cpsURL+"DataCollection/SIUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"UserInformation/SIGetOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
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
