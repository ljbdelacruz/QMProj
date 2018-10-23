//#region imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import {QuizTakersService} from '../../services/cpsAPI/quizMakerService/quizTakers.service'
import { QuizTakersVM } from '../../services/cpsAPI/quizMakerService/model.model';
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
import { CheckQuizPage } from '../check-quiz/check-quiz';
//#endregion
@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {

  //#region variables
  mode:number=0;
  qiid:string;
  //0-view QuizTakers users, 1-view quizTakers Survey
  //#endregion
  //#region const
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService, private gSer:GeneralService, private qtS:QuizTakersService, private popCtrl:PopoverController){
    this.qtlist=[];
    var param=this.navParams.get("param");
    this.mode=param.mode;
    if(this.mode==0){
      this.qiid=param.qiid;
    }
    this.LoadData(function(){}.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  //#endregion
  ionViewDidLoad(){}
  //#region db func
  qtlist:QuizTakersVM[];
  LoadData(success, failed){
    if(this.mode==0){
      this.qtS.GetQAUVM(this.qiid, this.gData.applicationID, function(list){
        this.qtlist=list;
        success();
      }.bind(this), failed.bind(this))
    }
  }
  RemoveQT(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qtS.Remove(this.selected.ID, this.qiid, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }

  //#endregion
  
  //#region page navigation
  Close(){
    this.navCtrl.pop();
  }
  CheckAnswers(){
    this.navCtrl.push(CheckQuizPage, {"param":{mode:2, qiid:this.qiid, qtid:this.selected.ID, event:this.EventInvoke.bind(this)}})
  }
  //#endregion
  //#region popupMenu
  moreMenuPopover:any;
  selected:QuizTakersVM;
  TogglePopover(event, qi:QuizTakersVM){
    this.selected=qi;
    var buttons=this.mode==0?[{label:'Check Answers', value:1}, {label:'Remove', value:2}] : this.mode==1?[]:[]
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:buttons,
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //checking user answers
      this.CheckAnswers();
    }else if(value==2){
      this.gSer.ShowAlertEvent("Do you want to remove this quiz taker?", "", "Yes", "Cancel", function(){
        this.RemoveQT(function(){
          this.gSer.ShowAlert("Quiz Taker Removed!");
          this.LoadData(function(){}.bind(this), function(message){this.gSer.ShowAlert(message);}.bind(this))
        }.bind(this), function(message){this.gSer.ShowAlert(message);}.bind(this))
      }.bind(this), function(){}.bind(this))
    }
  }
  //#endregion

  //#region global event
  EventInvoke(){
    this.LoadData(function(){}.bind(this), function(message){this.gSer.ShowAlert(message)}.bind(this))
  }
  //#endregion 
}
