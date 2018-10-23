//#region imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {QuizQuestionService} from '../../services/cpsAPI/quizMakerService/quizQuestion.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import { QuizQuestionsVM } from '../../services/cpsAPI/quizMakerService/model.model';
import {QuizUserAnswerService} from '../../services/cpsAPI/quizMakerService/quizUserAnswer.service'
import {QuizTakersService} from '../../services/cpsAPI/quizMakerService/quizTakers.service'
import {PopupImageDisplayComponent} from '../../components/popupImage/popMenu1.components'
import { ImageLinkStorageVM } from '../../services/cpsAPI/imageLinkStorageService/model.model';
import { bindCallback } from '../../../node_modules/rxjs/observable/bindCallback';
//#endregion

@IonicPage()
@Component({
  selector: 'page-check-quiz',
  templateUrl: 'check-quiz.html',
})
export class CheckQuizPage {
  qiid:string;
  qtid:string;
  mode:number=0;
  event:any;
  questions:QuizQuestionsVM[]=[];
  //0-quizTaker, 1-viewingUserAnswers, 2-Checking user answer, 3-Survey View Format

  //#region const
  constructor(public navCtrl: NavController, public navParams: NavParams, private qqS:QuizQuestionService, private gData:GlobalDataService, private gSer:GeneralService, private quaS:QuizUserAnswerService, private qtS:QuizTakersService,
  private popCtrl:PopoverController) {
    var param=this.navParams.get("param");
    this.mode=param.mode;
    this.qiid=param.qiid;
    this.qtid=param.qtid;
    this.event=param.event;
    this.LoadQuestions(function(){
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  //#endregion
  ionViewDidLoad() {
  }
  //#region func
  LoadQuestions(success, failed){
    if(this.mode==0){
      this.qqS.GetVM(this.qiid, this.gData.applicationID, function(lists){
        this.questions=lists;
        success();
      }.bind(this), failed.bind(this))
    }else if(this.mode==1 || this.mode==2){
      this.qqS.GetQUAVM(this.qiid, this.qtid, this.gData.applicationID, function(list){
        this.questions=list;
        success();
      }.bind(this), failed.bind(this))
    }else if(this.mode == 3){
      this.qqS.GetBySurveyVM(this.qiid, this.gData.userInfo.ID, this.gData.applicationID,
      function(list){
        this.questions=list;
        success();
      }.bind(this), failed.bind(this))
    }
  }
  InsertListUserAnswers(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    var index=0;
    this.questions.forEach(el=>{
      this.quaS.InsertNew(this.qtid, el.ID, el.UserAnswer.QuizAnswerID, el.UserAnswer.OtherAnswer, ""+el.UserAnswer.PointsEarned, function(id){
        index++;
        if(index==this.questions.length){
          load.dismiss();
          success();
        }
      }.bind(this), function(message){
        failed(message);
        index++;
        if(index==this.questions.length){
          load.dismiss();
          failed(message);
        }
      }.bind(this))
    })
  }
  UpdateTestScores(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    var index=0;
    this.questions.forEach(el=>{
      console.log(el.Status.Name);
      if(el.Status.Name == 'Essay'){
        console.log(el);
        //update test score
        this.quaS.Update(el.UserAnswer.ID, this.qtid, el.ID, el.UserAnswer.QuizAnswerID, el.UserAnswer.OtherAnswer, ""+el.UserAnswer.PointsEarned, function(){
          index++;
          if(index==this.questions.length){
            load.dismiss();
            success();
          }
        }.bind(this), function(message){
          index++;
          if(index==this.questions.length){
            load.dismiss();
            failed(message);
          }
        }.bind(this))
      }else{
        index++;
        if(index==this.questions.length){
          load.dismiss();
          success();
        }
      }
      
    })
  }

  CheckTest(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Checking test please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qtS.CheckTest(this.qtid, this.gData.applicationID, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  //#endregion
  
  //#region event catcher
  InvokeEvent(){
    if(this.event!=undefined){
      this.event();
    }
  }
  SaveAnswers(){
    if(this.mode==2){
      //update test scores
      this.gSer.ShowAlertEvent("Do you want to update scores?", "", "Yes", "Cancel", 
      function(){
        this.UpdateTestScores(function(){
          this.CheckTest(function(){
            this.gSer.ShowAlert("Scores Updated!");
            this.InvokeEvent();
            this.navCtrl.pop();
          }.bind(this), function(message){this.gSer.ShowAlert(message)}.bind(this))
        }.bind(this), function(message){this.gSer.ShowAlert(message)}.bind(this))
      }.bind(this), function(){}.bind(this))
    }else if(this.mode==0){
      //submit answers by quizTakers
      this.gSer.ShowAlertEvent("Do you want to submit your answers?", "", "Yes", "Cancel", 
      function(){
        this.InsertListUserAnswers(function(){
          this.CheckTest(function(){
            this.gSer.ShowAlert("Answers Submitted!");
            this.Close();
          }.bind(this), function(message){this.gSer.ShowAlert(message);}.bind(this))
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))
      }.bind(this), function(){}.bind(this))
    }
  }
  //#endregion
  
  //#region page navigation
  Close(){
    this.navCtrl.pop();
  }
  //#endregion
  
  //#region popupImage
  moreMenuPopover:any;
  TogglePopover(event, img:ImageLinkStorageVM[]){
    this.moreMenuPopover = this.popCtrl.create(PopupImageDisplayComponent, {"param":{data:img}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }

  //#endregion
  

}
