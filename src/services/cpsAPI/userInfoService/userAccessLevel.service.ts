import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
import {SecurityGeneratorService} from '../securityGeneratorService/securityGenerator.service'
import {DateTimeStorageService} from '../dateTimeAPI/dateTimeStorage.service'
//this one is for requesting data from request database
//view model
import {UsersViewModel} from './model.model';
@Injectable()
export class UserAccessLevelService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService, private sgS:SecurityGeneratorService,
    private dtS:DateTimeStorageService){
        this.headers=new Headers();
    }
    //#region db query
    Insert(id:string, uid:string, alid:string, aid:string, dtid:string, ia:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("alid", alid);
        body.append("aid", aid);
        body.append("dtid", dtid);
        body.append("ia", ia);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/UALInsert", this.headers, body, success.bind(this), failed.bind(this))
    }
    InsertNew(uid:string, alid:string, aid:string, ia:string, cid:string, tz:string, success, failed){
        this.sgS.GetID(function(id){
            this.dtS.InsertNew(id, aid, cid, tz, function(dtid){
                this.Insert(id, uid, alid, aid, dtid, ia, success.bind(this), failed.bind(this))
            }.bind(this), failed.bind(this))
        }.bind(this), failed.bind(this))
    }
    Remove(id:string, uid:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("uid", uid);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/UALRemove", this.headers, body, success.bind(this), failed.bind(this))
    }
    GetByList(id:string, aid:string, success, failed){
        var body=new FormData();
        body.append("id", id);
        body.append("aid", aid);
        this.rs.SimplifyPost(this.gser.cpsURL+"UserInformation/UALGetByList", this.headers, body, success.bind(this), failed.bind(this))
    }

    //#endregion

    //#region util
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

    //#endregion

}
