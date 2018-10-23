import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {QuizTakersVM} from './model.model'
import {SecurityGeneratorService} from '../securityGeneratorService/securityGenerator.service'
import {DateTimeStorageService} from '../dateTimeAPI/dateTimeStorage.service'
@Injectable()
export class QuizTakersService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private scgS:SecurityGeneratorService, private dtsS:DateTimeStorageService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, qiid:string, uid:string, tp:string, dtid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        body.append("uid", uid);
        body.append("tp", tp);
        body.append("dtid", dtid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QTInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertNew(qiid:string, uid:string, tp:string, aid:string, tz:string, cid:string, success, failed){
        if(qiid.length > 0){
            this.scgS.GetID(function(id){
                this.dtsS.InsertNew(id, aid, cid, tz, function(dtid){
                    this.Insert(id, qiid, uid, tp, dtid, aid, success.bind(this), failed.bind(this))
                }.bind(this), failed.bind(this))
            }.bind(this), failed.bind(this))
        }else{
            failed("Data not set please contact administrator!");
        }
    }

    Remove(id:string, qiid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QTRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, qiid:string, uid:string, tp:string, dtid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        body.append("uid", uid);
        body.append("tp", tp);
        body.append("dtid", dtid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QTUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    CheckTest(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", id);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QTCheckTestScore", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    GetQuiz(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"QuizMaker/QTGetByQuiz?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetQuizVM(id:string, aid:string, success, failed){
        this.GetQuiz(id, aid, function(data){
            this.MsToVMs(data, success.bind(this));
        }.bind(this), failed.bind(this))
    }
    Get(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QTGet", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetVM(id:string, aid:string, success, failed){
        this.Get(id, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    GetUQA(id:string, qiid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QTGetUQA", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetUQAVM(id:string, qiid:string, aid:string, success, failed){
        this.GetUQA(id, qiid, aid, function(data){
            this.MToVM(data, success.bind(this));
        }.bind(this), failed.bind(this))
    }
    GetQAU(qiid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("qiid", qiid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QTGetQAU", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetQAUVM(qiid:string, aid:string, success, failed){
        this.GetQAU(qiid, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }

    //#endregion
    //#region Util
    functions
    MToVM(object, success){
        var item=new QuizTakersVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizTakersVM[]=[];
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
