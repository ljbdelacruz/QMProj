//#region imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {QuizInfoService} from '../../../services/cpsAPI/quizMakerService/quizInfo.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import { QuizInfoVM, QuizTakersVM } from '../../../services/cpsAPI/quizMakerService/model.model';
import {PopupMenuComponent} from '../../../components/popupMenu1/popMenu1.components'
import {QuizInfoDetailsPage} from '../quiz-info-details/quiz-info-details'
import {GeneralService} from '../../../services/general.service'
import { CheckQuizPage } from '../../check-quiz/check-quiz';
import {QuizTakersService} from '../../../services/cpsAPI/quizMakerService/quizTakers.service'
//#endregion
@IonicPage()
@Component({
  selector: 'page-view-quiz-info-list',
  templateUrl: 'view-quiz-info-list.html',
})
export class ViewQuizInfoListPage {
  uid:string;
  qlist:QuizInfoVM[];
  mode:number=0;
  //0 - user owner view
  //1 - view quiz taken by user
  isLoading:boolean=false;
  //#region const
  constructor(public navCtrl: NavController, public navParams: NavParams, private qiS:QuizInfoService, private gData:GlobalDataService,
  private popCtrl:PopoverController, private gSer:GeneralService, private qtS:QuizTakersService) {
    var param=this.navParams.get("param");
    this.uid=param.uid;
    this.mode=param.mode;
    this.qlist=[];
    if(this.mode==0){
      this.LoadQuizInfo(function(){}.bind(this), function(message){
        this.isLoading=false;
        this.gSer.ShowAlert(message);
      }.bind(this))
    }else{
      this.LoadQuizInfo(function(){}.bind(this), function(message){
        this.isLoading=false;
        this.gSer.ShowAlert(message);
      }.bind(this))
    }
  }
  //#endregion
  ionViewDidLoad() {
  }
  //#region DB func
  LoadQuizInfo(success, failed){
    this.isLoading=true;
    if(this.mode==0){
      this.qiS.GetOwnerVM(this.uid, this.gData.applicationID, function(models){
        this.qlist=models;
        this.isLoading=false;
      }.bind(this), failed.bind(this))
    }else{
      this.qiS.GetByTakersVM(this.uid, this.gData.applicationID, function(models){
        this.qlist=models;
        this.isLoading=false;
        success();
      }.bind(this), failed.bind(this))
    }
  }
  RemoveQuizInfo(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qiS.Remove(this.selected.ID, this.gData.applicationID, this.uid, this.gData.quizMakerImages, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  GetQuizTakerInfo(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qtS.GetUQAVM(this.gData.userInfo.ID, this.selected.ID, this.gData.applicationID, function(model){
      load.dismiss();
      success(model);
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
  AddNewQuizInfo(){
    this.NavigateQuizInfo({mode:3, oid:this.gData.userInfo.ID, event:this.InvokeEvent.bind(this)});
  }
  EditQuiz(){
    this.NavigateQuizInfo({mode:2, model:this.selected, oid:this.gData.userInfo.ID, event:this.InvokeEvent.bind(this)});
  }
  ViewQuizInfo(){
    this.NavigateQuizInfo({mode:1, oid:this.gData.userInfo.ID, model:this.selected});
  }
  NavigateQuizInfo(param){
    this.navCtrl.push(QuizInfoDetailsPage, {"param":param});
  }
  CheckQuizResult(){
    this.GetQuizTakerInfo(function(model:QuizTakersVM){
      this.navCtrl.push(CheckQuizPage, {"param":{mode:1, qiid:this.selected.ID, qtid:model.ID}})
    }.bind(this), function(message){this.gSer.ShowAlert(message)}.bind(this))
  }

  //#endregion
  //#region popmenu
  moreMenuPopover:any;
  selected:QuizInfoVM;
  TogglePopover(event, qi:QuizInfoVM){
    this.selected=qi;
    var buttons=this.mode==0?[{label:'Modify', value:1},{label:'Remove', value:2}, {label:'Info', value:4}] : [{label:'Results', value:3}]
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:buttons,
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //edit
      this.EditQuiz();
    }else if(value==2){
      this.gSer.ShowAlertEvent("Do you want to remove Quiz?", "", "Yes", "Cancel", function(){
        this.RemoveQuizInfo(function(){
          this.gSer.ShowAlert("Quiz Removed!");
          this.LoadQuizInfo(function(){}.bind(this), function(){}.bind(this))
        }.bind(this), function(message){this.gSer.ShowAlert(message)}.bind(this))
      }.bind(this), function(){}.bind(this))
    }else if(value==3){
      this.CheckQuizResult();
    }else if(value==4){
      //view quizInfo
      this.ViewQuizInfo();
    }
  }
  //#endregion
  //#region global event
  InvokeEvent(){
    this.LoadQuizInfo(function(){}.bind(this), function(message){this.gSer.ShowAlert(message);}.bind(this))
  }
  //#endregion
}
