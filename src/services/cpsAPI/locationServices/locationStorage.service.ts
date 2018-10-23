import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {LocationStorageVM} from './model.model'
@Injectable()
export class LocationStorageService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string,oid:string, lcid:string, longi:string, lat:string, desc:string, dtid:string, ia:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("lcid", lcid);
        body.append("longi", longi);
        body.append("lat", lat);
        body.append("desc", desc);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"LocationStorage/LSInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        this.rs.SimplifyPost(this.gser.cpsURL+"LocationStorage/LSRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, oid:string, longi:string, lat:string, desc:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("longi", longi);
        body.append("lat", lat);
        body.append("desc", desc);
        this.rs.SimplifyPost(this.gser.cpsURL+"LocationStorage/LSUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetByID(id:string, oid:string, lcid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"LocationStorage/LSGetByID?id="+id+"&oid="+oid+"&lcid="+lcid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByOwner(id:string, lcid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"LocationStorage/LSGetByOwner?id="+id+"&lcid="+lcid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetByCategory(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"LocationStorage/LSGetByCategory?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    MToVM(object, success){
        var item=new LocationStorageVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:LocationStorageVM[]=[];
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
