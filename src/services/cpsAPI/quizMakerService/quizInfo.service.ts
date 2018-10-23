import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {QuizInfoVM} from './model.model'
import {SecurityGeneratorService} from '../securityGeneratorService/securityGenerator.service'
@Injectable()
export class QuizInfoService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private scgS:SecurityGeneratorService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, name:string, oid:string, aid:string, qc:string, htl:string, sid:string, qsid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("qc", qc);
        body.append("htl", htl);
        body.append("sid", sid);
        body.append("qsid", qsid);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QIInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertNew(name:string, oid:string, aid:string, qc:string, htl:string, sid:string, qsid:string, dtid:string,success, failed){
        this.scgS.GetID(function(id){
            this.Insert(id, name, oid, aid, qc, htl, sid, qsid, dtid, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    Remove(id:string, aid:string, oid:string, cid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        body.append("oid", oid);
        body.append("cid", cid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QIRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, name:string, oid:string, aid:string, qc:string, htl:string, sid:string, qsid:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("name", name);
        body.append("oid", oid);
        body.append("aid", aid);
        body.append("qc", qc);
        body.append("htl", htl);
        body.append("sid", sid);
        body.append("qsid", qsid);
        body.append("dtid", dtid.length <= 0 ? "00000000-0000-0000-0000-000000000000":dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QIUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    CodeCheck(qc:string, aid:string, success, failed){
        var body=new FormData();
        body.append("qc", qc);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QIInputCode", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetOwner(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"QuizMaker/QIGetByOwner?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetOwnerVM(id:string, aid:string, success, failed){
        this.GetOwner(id, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    Get(id:string, oid:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"QuizMaker/QIGetByID?id="+id+"&oid="+oid+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetVM(id:string, oid:string, aid:string, success, failed){
        this.Get(id, oid, aid, function(data){
            this.MToVM(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetByTakers(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QIGetByTakers", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByTakersVM(id:string, aid:string, success, failed){
        this.GetByTakers(id, aid, function(data){
            this.MsToVMs(data, success.bind(this));
        }.bind(this), failed.bind(this))
    }
    EnterQC(qc:string, aid:string, success, failed){
        var body=new FormData();
        body.append("qc", qc);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QIInputCode", this.headers, body, success.bind(this), failed.bind(this))
    }
    EnterQCVM(qc:string, aid:string, success, failed){
        this.EnterQC(qc, aid, function(data){
            this.MToVM(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    //functions
    MToVM(object, success){
        var item=new QuizInfoVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizInfoVM[]=[];
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
