import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
import {GlobalDataService} from '../../singleton/global.data';
import {RequestService} from '../../request.service';
@Injectable()
export class SecurityGeneratorService{
    headers:any;
    constructor(private gser:GlobalDataService, private rs:RequestService){
        this.headers=new Headers();
    }
    //#region Post
    GetID(success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"SecurityGenerator/SGCGenerateID", this.headers, success.bind(this), failed.bind(this))
    }
    GetCode(success, failed){
        this.rs.SimplifyGet(this.gser.cpsURL+"SecurityGenerator/SGCGenerateCode1", this.headers, success.bind(this), failed.bind(this))
    }
    //#endregion

}
