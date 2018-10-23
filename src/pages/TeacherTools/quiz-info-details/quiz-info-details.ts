//#region imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuizInfoVM, QuizQuestionsVM } from '../../../services/cpsAPI/quizMakerService/model.model';
import {QuizInfoService} from '../../../services/cpsAPI/quizMakerService/quizInfo.service'
import {QuizQuestionService} from '../../../services/cpsAPI/quizMakerService/quizQuestion.service'
import {GeneralService} from '../../../services/general.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import {SecurityGeneratorService} from '../../../services/cpsAPI/securityGeneratorService/securityGenerator.service'
import {DateTimeStorageService} from '../../../services/cpsAPI/dateTimeAPI/dateTimeStorage.service'
import { ModifyQuestionPage } from '../modify-question/modify-question';
import {PopupMenuComponent} from '../../../components/popupMenu1/popMenu1.components'
import { UserListPage } from '../../user-list/user-list';
import { CheckQuizPage } from '../../check-quiz/check-quiz';
//#endregion
@IonicPage()
@Component({
  selector: 'page-quiz-info-details',
  templateUrl: 'quiz-info-details.html',
})
export class QuizInfoDetailsPage {
  //#region variables
  copyString:string;
  qiModel:QuizInfoVM;
  qlist:QuizQuestionsVM[]=[];
  oid:string;
  mode:number=0;
  isOpen:boolean=false;
  quizType:string;
  event:any;
  isSurvey:boolean=false;
  //#endregion
  //#region mode Legend
  //0-user view
  //1-admin view
  //2-edit
  //3-add quizInfo
  //#endregion

  //#region constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, private qqS:QuizQuestionService,
  private gSer:GeneralService, private gData:GlobalDataService, private qiS:QuizInfoService, private scgS:SecurityGeneratorService,
  private dtsS:DateTimeStorageService, private popCtrl:PopoverController) {
    this.quizType="";
    var param=this.navParams.get("param");
    this.mode=param.mode;
    this.qiModel=new QuizInfoVM();
    this.oid=param.oid;
    this.event=param.event;
    if(this.mode == 1 || this.mode==2){
      this.qiModel=param.model;
      this.isSurvey=this.qiModel.Status.Name=="Questionaire"?false:true;
      this.LoadQuestions(function(){}.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
    }
    if(this.mode==2){
      if(this.qiModel.QuizStatus.Name == "Opened"){
        this.isOpen=true;
      }else{
        this.isOpen=false;
      }
      if(this.qiModel.Status.Name=="Questionaire"){
        this.isSurvey=false;
        this.quizType="419d67aa-4436-4811-a570-a716e7da490f";
      }else{
        this.isSurvey=true;
        this.quizType="a69d7206-4bd6-4b79-9460-e38ed713efe0";
      }
    }else if(this.mode==3){
      this.isSurvey=this.qiModel.Status.Name=="Questionaire"?false:true;
      this.scgS.GetID(function(id){
        this.qiModel.ID=id;
        this.InsertNewDT(function(dtid){
          this.qiModel.DateTimeStorage.ID=dtid;
        }.bind(this), function(message){}.bind(this))
      }.bind(this), function(message){})
      this.scgS.GetCode(function(code){ 
        this.qiModel.QuizCode=code;
      }.bind(this), function(message){})  
    }
    console.log(this.isSurvey);
  }
  InsertNewDT(success, failed){
    this.dtsS.InsertNew(this.qiModel.ID, this.gData.applicationID, "094ced63-5601-407a-b46f-544a6ebe95ec", this.gData.selectedTimezone, success.bind(this), failed.bind(this))
  }

  //#endregion
  InvokeEvent(){
    if(this.event!=undefined){
      this.event();
    }
  }
  InsertQI(){
    this.CheckingData(function(){
      if(this.mode==3){
        //add quizInfo
        this.InsertNewQuizInfo(function(id){
          this.gSer.ShowAlert("Test Created!");
          this.navCtrl.pop();
          this.InvokeEvent();
        }.bind(this), function(message){this.gSer.ShowAlert(message);}.bind(this))
      }else if(this.mode==2){
        //update
        this.Update(function(){
          this.gSer.ShowAlert("Test Updated!");
          this.navCtrl.pop();
          this.InvokeEvent();
        }.bind(this), function(message){this.gSer.ShowAlert(message)}.bind(this))
      }
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }

  //#region util
  CheckingData(success, failed){
    if(this.quizType.length > 0){
      success();
    }else{
      failed("Make To select Quiz Type");
    }
  }
  //#endregion
  
  //#region insert Load Data from db func
  LoadQuestions(success, failed){
    this.qqS.GetVM(this.qiModel.ID, this.gData.applicationID, function(models){
      this.qlist=models;
      success();
    }.bind(this), failed.bind(this))
  }
  Update(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    console.log(this.qiModel);
    this.qiS.Update(this.qiModel.ID, this.qiModel.Name, this.oid, this.gData.applicationID, this.qiModel.QuizCode, ""+this.qiModel.hasTimeLimit, this.quizType, this.isOpen?"a0ca62a8-34bb-4316-9f10-e2071b5d615d":"7b3f5e5b-744a-4471-8392-5aa525627547", this.qiModel.DateTimeStorage.ID, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  
  InsertNewQuizInfo(success, failed){
    //#region Legend
    //QuizStatus
    //7b3f5e5b-744a-4471-8392-5aa525627547-Closed
    //a0ca62a8-34bb-4316-9f10-e2071b5d615d-Opened
    //Status
    //419d67aa-4436-4811-a570-a716e7da490f-questionaire
    //a69d7206-4bd6-4b79-9460-e38ed713efe0-survey
    //#endregion
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))

    this.qiS.Insert(this.qiModel.ID, this.qiModel.Name, this.oid, this.gData.applicationID, this.qiModel.QuizCode, ""+this.isOpen, this.quizType, this.isOpen?"a0ca62a8-34bb-4316-9f10-e2071b5d615d":"7b3f5e5b-744a-4471-8392-5aa525627547", this.qiModel.DateTimeStorage.ID, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      console.log("Inserting Quiz info");
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  RemoveQuestion(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qqS.Remove(this.selected.ID, this.qiModel.ID, this.gData.quizMakerImages, this.gData.applicationID, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dimiss();
      failed(message);
    }.bind(this))
  }

  //#endregion
  
  //#region page navigation
  Close(){
    if(this.mode == 3){
      this.gSer.ShowAlertEvent("Do you want to discard changes?", "", "Yes", "No", function(){
        //remove date time
        this.dtsS.Remove(this.qiModel.DateTimeStorage.ID, this.gData.applicationID, this.qiModel.ID, function(){
          this.navCtrl.pop();
        }.bind(this), function(message){}.bind(this))
      }.bind(this), function(){}.bind(this))
    }else{
      this.navCtrl.pop();
    }
  }
  NewQuestion(){
    this.ModifyQuestionNavigate({mode:0, qiid:this.qiModel.ID, order:this.qlist.length, event:this.GlobalEvent.bind(this), posOr:this.qlist.length, isSurvey:this.isSurvey});
  }
  EditQuestion(){
    this.ModifyQuestionNavigate({mode:1, data:this.selected, qiid:this.qiModel.ID, order:this.selected.Order, event:this.GlobalEvent.bind(this), posOr:this.qlist.length, isSurvey:this.isSurvey});
  }
  ModifyQuestionNavigate(param){
    this.navCtrl.push(ModifyQuestionPage, {"param":param});
  }
  ViewQuizTakers(){
    this.navCtrl.push(UserListPage, {"param":{mode:this.isSurvey?1:0, qiid:this.qiModel.ID}})
  }
  ViewSurvey(){
    this.navCtrl.push(CheckQuizPage, {"param":{mode:3, qiid:this.qiModel.ID}});
  }
  //#endregion
  
  //#region popupmenu
  moreMenuPopover:any;
  selected:QuizQuestionsVM;
  TogglePopover(event, qi:QuizQuestionsVM){
    this.selected=qi;
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[ 
    {label:'Modify', value:1}, {label:'Remove', value:2}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //edit choice
      this.EditQuestion();
    }else if(value==2){
      //Remove Question
      this.gSer.ShowAlertEvent("Are you sure you want to remove this Question?", "", "Yes", "Cancel", function(){
        this.RemoveQuestion(function(){
          //load question
          this.LoadQuestions(function(){}.bind(this), function(message){
            this.gSer.ShowAlert(message);
          }.bind(this))
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))
      }.bind(this), function(){})
    }
  }
  //#endregion
  //#region global event
  //event invoked when you want to invoke event from other page that is related to this page
  GlobalEvent(){
    this.LoadQuestions(function(){}.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  //#endregion
  //#region event catcher
  CopyFunc(){
    this.copyString=this.qiModel.QuizCode;
    this.gSer.ShowAlert("Copied!");
    this.gData.copyString=this.copyString;
  }
  ViewSurveyResult(){
    this.ViewSurvey();
  }
  //#endregion

}
