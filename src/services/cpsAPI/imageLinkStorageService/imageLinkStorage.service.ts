import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {ImageLinkStorageVM} from './model.model'
import {SecurityGeneratorService} from '../securityGeneratorService/securityGenerator.service'
import {DateTimeStorageService} from '../dateTimeAPI/dateTimeStorage.service'
@Injectable()
export class ImageLinkStorageService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private scgS:SecurityGeneratorService, private dtS:DateTimeStorageService){
        this.headers=new Headers();
    }
    
    //#region Post
    Insert(id:string, oid:string, src:string, aid:string, dtid:string, cid:string, order:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("src", src);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("cid", cid);
        body.append("o", order);
        this.rs.SimplifyPost(this.gser.cpsURL+"ImageLinkStorage/ILSInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertNew(oid:string, src:string, aid:string, cid:string, tz:string, order:string, success, failed){
        this.scgS.GetID(function(id){
            //insert datetime
            this.dtS.InsertNew(id, aid, cid, tz, function(dtid){
                //insert ils
                this.Insert(id, oid, src, aid, dtid, cid, order, success.bind(this), failed.bind(this))
            }.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    Remove(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id)
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"ImageLinkStorage/ILSRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    RemoveID(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id)
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"ImageLinkStorage/ILSRemoveID", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, oid:string, src:string, aid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("src", src);
        body.append("aid", aid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"ImageLinkStorage/ILSUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    Get(id:string, oid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"ImageLinkStorage/ILSGet?id="+id+"&oid="+oid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetVM(id:string, oid:string, aid:string, success, failed){
        this.Get(id, oid, aid, function(data){
            this.MToVM(data, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"ImageLinkStorage/ILSGetOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetOwnerVM(id:string, aid:string, success, failed){
        this.GetOwner(id, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util  
    //functions
    MToVM(object, success){
        var item=new ImageLinkStorageVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:ImageLinkStorageVM[]=[];
        if(list.length > 0){
            list.forEach(el => {
                this.MToVM(el, function(resp){
                    nlist.push(resp);
                    index++;
                    if(index==list.length){
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
