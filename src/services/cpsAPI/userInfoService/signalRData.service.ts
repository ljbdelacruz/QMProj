import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
//this one is for requesting data from request database
//view model
import {UsersViewModel} from './model.model';
@Injectable()
export class SignalRDataService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }    
    Insert(id:string, oid:string, sid:string, aid:string, dtid:string,h:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("sid", sid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("h", h)
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/SRDInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/SRDRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, oid:string, sid:string, aid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("sid", sid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/SRDUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"UserInformation/SRDGetOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
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
