import {Component, EventEmitter, Input, Output, OnDestroy} from '@angular/core';
import {NavParams} from 'ionic-angular'
import {GlobalDataService} from '../../services/singleton/global.data'
import { ImageLinkStorageVM } from '../../services/cpsAPI/imageLinkStorageService/model.model';
@Component({
    selector:'app-popup-image',
    templateUrl:'./popMenu1.components.html'
})
export class PopupImageDisplayComponent implements OnDestroy{
    imgURL:string;
    images:ImageLinkStorageVM[];
    /*number of seconds ionInput event will execute*/
    constructor(navParam:NavParams, private gData:GlobalDataService){
        var param=navParam.get("param");
        this.images=param.data;
        this.imgURL=this.gData.cpsURL;
    }
    ngOnDestroy() {
    }
}

