import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {QuizUserAnswerVM} from './model.model'
import {SecurityGeneratorService} from '../securityGeneratorService/securityGenerator.service'
@Injectable()
export class QuizUserAnswerService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private scgS:SecurityGeneratorService){
        this.headers=new Headers();
    }
    
    //#region Post
    Insert(id:string, qtid:string, qqid:string, qaid:string, oa:string, pe:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qtid", qtid);
        body.append("qqid", qqid);
        body.append("qaid", qaid.length > 0?qaid:"00000000-0000-0000-0000-000000000000");
        body.append("oa", oa);
        body.append("pe", pe);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QUAInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertNew(qtid:string, qqid:string, qaid:string, oa:string, pe:string, success, failed){
        this.scgS.GetID(function(id){
            this.Insert(id, qtid, qqid, qaid, oa, pe, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }

    Remove(id:string, qtid:string, qqid:string, qaid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qtid", qtid);
        body.append("qqid", qqid);
        body.append("qaid", id);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QUARemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, qtid:string, qqid:string, qaid:string, oa:string, pe:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qtid", qtid);
        body.append("qqid", qqid);
        body.append("qaid", qaid);
        body.append("oa", oa);
        body.append("pe", pe);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QUAUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    CheckTest(id:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QUACheckTest", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    Get(id:string, qtid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"QuizMaker/QUAGet?id="+id+"&qtid="+qtid, this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    //functions
    MToVM(object, success){
        var item=new QuizUserAnswerVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizUserAnswerVM[]=[];
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
