import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {QuizQuestionsVM} from './model.model'
@Injectable()
export class QuizQuestionService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    Insert(id:string, ques:string, qiid:string, order:string, p:string, sid:string,success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("ques", ques);
        body.append("qiid", qiid);
        body.append("order", order);
        body.append("p", p);
        body.append("sid", sid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    Remove(id:string, qiid:string, cid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("qiid", qiid);
        body.append("aid", aid);
        body.append("cid", cid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    Update(id:string, ques:string, qiid:string, order:string, p:string, sid:string,success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("ques", ques);
        body.append("qiid", qiid);
        body.append("order", order);
        body.append("p", p);
        body.append("sid", sid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQUpdate", this.headers, body, success.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Get
    Get(id:string, aid:string, success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"QuizMaker/QQGet?id="+id+"&aid="+aid, this.headers, success.bind(this), failed.bind(this))
    }
    GetVM(id:string, aid:string, success, failed){
        this.Get(id, aid, function(data){
            this.MsToVMs(data, success.bind(this));
        }.bind(this), failed.bind(this))
    }
    GetQUA(qiid:string, qtid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("qiid", qiid);
        body.append("qtid", qtid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQGetQUA", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetQUAVM(qiid:string, qtid:string, aid:string, success, failed){
        this.GetQUA(qiid, qtid, aid, function(data){
            this.MsToVMs(data, success.bind(this))            
        }.bind(this), failed.bind(this))
    }
    GetBySurvey(id:string, oid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("oid", oid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"QuizMaker/QQGetBySurvey", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetBySurveyVM(id:string, oid:string, aid:string, success, failed){
        this.GetBySurvey(id, oid, aid, function(data){
            this.MsToVMs(data, success.bind(this))
        }.bind(this), failed.bind(this))
    }
    //#endregion
    //#region Util
    //functions
    MToVM(object, success){
        var item=new QuizQuestionsVM();
        item.set(object);
        success(item);
    }
    MsToVMs(list, success){
        var index=0;
        var nlist:QuizQuestionsVM[]=[];
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
