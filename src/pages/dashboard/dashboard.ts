import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//#region Pages
import {ToolsPage} from '../TeacherTools/Tools/tools';
import {CheckQuizPage} from '../check-quiz/check-quiz'
//#endregion
//
//#region Services
import {GeneralService} from '../../services/general.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import { UserAccessLevelVM } from '../../services/cpsAPI/userInfoService/model.model';
import { ViewQuizInfoListPage } from '../TeacherTools/view-quiz-info-list/view-quiz-info-list';
import {QuizInfoService} from '../../services/cpsAPI/quizMakerService/quizInfo.service'
import {QuizTakersService} from '../../services/cpsAPI/quizMakerService/quizTakers.service'
import { QuizInfoVM } from '../../services/cpsAPI/quizMakerService/model.model';
//#endregion

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  code:string;
  uaccessLevel:UserAccessLevelVM[];
  isUser:boolean=false;
  constructor(public navCtrl: NavController, private gSer:GeneralService, private gData:GlobalDataService, private qiS:QuizInfoService,
  private qtS:QuizTakersService) {
    this.code="";
    this.uaccessLevel=this.gData.userAccessLevel;
  }
  ionViewDidLoad() {
  }
  //#region page navigation
  GotoTools(){
   this.navCtrl.push(ToolsPage);
  }
  ViewMyQuizTakenPage(){
    this.navCtrl.push(ViewQuizInfoListPage, {"param":{mode:1, uid:this.gData.userInfo.ID}});
  }
  AnswerQuizPage(){
    this.navCtrl.push(CheckQuizPage, {"param":{mode:0, qiid:this.qiModel.ID, qtid:this.qtid}});
  }
  Close(){
    this.navCtrl.pop();
    this.gData.userInfo.empty();
    this.gData.userAccessLevel=[];
  }
  //#endregion
  
  //#region function
  qiModel:QuizInfoVM;
  EnterQC(success, failed){
    this.qiModel=new QuizInfoVM();
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing request please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qiS.EnterQC(this.code, this.gData.applicationID, function(model){
      this.qiModel=model;
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  qtid:string;
  InsertQT(success, failed){
   var load;
   this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
     load=obj;
     load.present();
   }.bind(this))
   this.qtS.InsertNew(this.qiModel.ID, this.gData.userInfo.ID, ""+0, this.gData.applicationID, this.gData.selectedTimezone, this.gData.quizMakerImages, function(id){
     this.qtid=id;
     load.dismiss();
     success();
   }.bind(this), function(message){
     load.dismiss();
     failed(message);
   }.bind(this))
  }
  

  //#endregion
  //#region event catcher
  EnterCode(){
    this.EnterQC(function(){
      this.gSer.ShowAlertEvent("This quiz is available do you want to proceed?", "", "Yes", "Cancel", function(){
        this.InsertQT(function(){
          this.AnswerQuizPage();
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))
      }.bind(this), function(){}.bind(this))
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  //#endregion
}
