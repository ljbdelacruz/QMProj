import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
//this one is for requesting data from request database
//view model
import {UsersViewModel} from './model.model';
@Injectable()
export class UsersServices{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Insert(id:string, fname:string, lname:string, mname:string, add:string, email:string, pass:string, rpass:string,
    cnum:string, ia:string, areg:string, profID:string, dtid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("fname", fname);
        body.append("lname", lname);
        body.append("mname", mname);
        body.append("add",add);
        body.append("email", email);
        body.append("pass", pass);
        body.append("rpass", rpass);
        body.append("cnum", cnum);
        body.append("ia", ia);
        body.append("areg", areg);
        body.append("profid", profID);
        body.append("dtid", dtid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/UInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Authenticate(email:string, pass:string, aid:string, success, failed){
        var body=new FormData();
        body.append("email", email);
        body.append("pass", pass);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/UAuthenticate", this.headers, body, success.bind(this), failed.bind(this))
    }
    UpdatePassword(id:string, pass:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("pass", pass);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/UUpdatePassword", this.headers, body, success.bind(this), failed.bind(this))
    }
    UpdateProfileImage(id:string, profID:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("profID", profID);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/UUpdateProfileImage", this.headers, body, success.bind(this), failed.bind(this))
    }
    
    //functions
    MToVM(object, success){
        var item=new UsersViewModel();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:UsersViewModel[]=[];
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

}
