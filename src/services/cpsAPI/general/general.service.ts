// import {Device} from '@ionic-native/device';
import { Injectable } from '@angular/core';
import {SelectChoiceVM} from './model.model'
@Injectable()
export class MyGeneralService{
    constructor(){}
    NumberToArray(num:number, success){
        var index=1;
        var list:SelectChoiceVM[]=[];
        if(num>0){
            for(var i=1; i<=num; i++){
                var temp=new SelectChoiceVM();
                temp.setM(i, i);
                list.push(temp);
                success(list);
            }
        }else{
            var temp=new SelectChoiceVM();
            temp.setM(1, 1);
            list.push(temp);
            success(list);
        }
    }
    SpliceItem(list:any[], id:string, success){
        var index=list.findIndex(x=>x.ID == id);
        list.splice(index, 1);
        success(list);
    }
}
