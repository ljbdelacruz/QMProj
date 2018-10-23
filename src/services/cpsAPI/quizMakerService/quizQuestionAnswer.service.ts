import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {QuizQuestionAnswerVM} from './model.model'
import {SecurityGeneratorService} from '../securityGeneratorService/securityGenerator.service'
import { identifierModuleUrl } from '../../../../node_modules/@angular/compiler';
@Injectable()
export class QuizQuestionAnswerService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private scgS:SecurityGeneratorService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, desc:string, p:string, ic:string, qqid:string,success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("desc", desc);
        body.append("p", p);
        body.append("ic", ic);
        body.append("qqid", qqid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQAInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertNew(desc:string, p:string, ic:string, qqid:string, success, failed){
        this.scgS.GetID(function(id){
            this.Insert(id, desc, p, ic, qqid, success.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    Remove(id:string, qqid:string, cid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qqid", qqid);
        body.append("cid", cid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQARemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, desc:string, p:string, ic:string, qqid:string,success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("desc", desc);
        body.append("p", p);
        body.append("ic", ic);
        body.append("qqid", qqid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQAUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    Get(id:string, aid:string, nid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"QuizMaker/QQAGet?id="+id+"&aid="+aid+"&nid="+nid, this.headers, success.bind(this), failed.bind(this))
    }
    GetQuestion(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"QuizMaker/QQAGetByQuestion?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetQuestionVM(id:string, aid:string, success, failed){
        this.GetQuestion(id, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    //functions
    MToVM(object, success){
        var item=new QuizQuestionAnswerVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizQuestionAnswerVM[]=[];
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
    DeselectItem(item:QuizQuestionAnswerVM[], success){
        var index=0;
        item.forEach(el=>{
            el.isSelected=false;
            index++;
            if(index==item.length){
                success();
            }
        })
    }
    //#endregion
    
}
