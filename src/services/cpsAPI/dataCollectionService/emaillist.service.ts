import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
@Injectable()
export class EmailListService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, name:string, email:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("email", email);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"DataCollection/ELInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.SimplifyPost(this.gser.cpsURL+"DataCollection/ELRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, name:string, email:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("email", email);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"DataCollection/ELUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }    
    CheckEmail(name:string, email:string, aid:string, success, failed){
        var body=new FormData();
        body.append("name", name);
        body.append("email", email);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"DataCollection/ELIsEmailExist", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region get
    Get(id:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"UserInformation/ELGet?id="+id, this.headers, success.bind(this), failed.bind(this))
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
