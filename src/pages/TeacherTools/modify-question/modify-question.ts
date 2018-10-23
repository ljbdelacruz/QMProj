//#region imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {QuizQuestionService} from '../../../services/cpsAPI/quizMakerService/quizQuestion.service'
import {QuizQuestionAnswerService} from '../../../services/cpsAPI/quizMakerService/quizQuestionAnswer.service'
import { QuizQuestionsVM, QuizQuestionAnswerVM } from '../../../services/cpsAPI/quizMakerService/model.model';
import {GlobalDataService} from '../../../services/singleton/global.data'
import {GeneralService} from '../../../services/general.service'
import {SecurityGeneratorService} from '../../../services/cpsAPI/securityGeneratorService/securityGenerator.service'
import {PopupMenuComponent} from '../../../components/popupMenu1/popMenu1.components'
import {MyGeneralService} from '../../../services/cpsAPI/general/general.service'
import { SelectChoiceVM } from '../../../services/cpsAPI/general/model.model';
import { ModifyChoicesPage } from '../modify-choices/modify-choices';
import {ImageLinkStorageService} from '../../../services/cpsAPI/imageLinkStorageService/imageLinkStorage.service'
import { ImageLinkStorageVM } from '../../../services/cpsAPI/imageLinkStorageService/model.model';
//#endregion
@IonicPage()
@Component({
  selector: 'page-modify-question',
  templateUrl: 'modify-question.html',
})
export class ModifyQuestionPage {
  //#region variables
  imgPath:string;
  qiid:string;
  //if survey always pick multiple choice
  isSurvey:boolean=false;
  qmodel:QuizQuestionsVM;
  status:string;
  order:number=0;
  qlistLength:number;
  choices:QuizQuestionAnswerVM[]=[];
  event:any;
  positionOrder:SelectChoiceVM[]=[];
  mode:number=0;
  images:ImageLinkStorageVM[]=[];
  cid:string;
  url:string;
  //#endregion
  //0-add
  //1-edit
  //#region const
  constructor(public navCtrl: NavController, public navParams: NavParams, private qqS:QuizQuestionService, private qqaS:QuizQuestionAnswerService, private gData:GlobalDataService, private gSer:GeneralService, private scgS:SecurityGeneratorService, private popCtrl:PopoverController, private mgS:MyGeneralService, private ilS:ImageLinkStorageService){
   this.url=this.gData.cpsURL;
   this.cid=this.gData.quizMakerImages;
   this.imgPath=this.gData.imgPath;
   this.qlistLength=0;
   this.status="ab075d70-d51b-4d75-95fe-123478bd2a48";
   this.qiid="";
   this.qmodel=new QuizQuestionsVM();
   var param=this.navParams.get("param");
   this.event=param.event;
   this.mode=param.mode;
   this.qiid=param.qiid;
   this.order=param.order==0?1:param.order;
   this.isSurvey=param.isSurvey;
   this.mgS.NumberToArray(param.posOr, function(list){
     this.positionOrder=list;
   }.bind(this))
   if(this.mode == 0){
    console.log("Is Survey");
    console.log(this.isSurvey);
    this.scgS.GetID(function(id){
      this.qmodel.ID=id;
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
   }else{
     console.log("Is Survey");
     console.log(this.isSurvey);
     this.qmodel=param.data;
     this.images=this.qmodel.Images;
     this.choices=this.qmodel.Choices;
     this.status=this.isSurvey? "4705bd60-d2e5-4e69-9fa6-1fe85e3c5e6f" : this.qmodel.Status.Name == "Essay" ? "ab075d70-d51b-4d75-95fe-123478bd2a48" : "4705bd60-d2e5-4e69-9fa6-1fe85e3c5e6f";
   }
  }
  //#endregion
  
  //#region event catcher
  AddEvent(){
    if(this.mode==0){
      this.gSer.ShowAlertEvent("Do you want to save this question?", "", "Yes", "Cancel", function(){
        this.Add(function(){
          this.gSer.ShowAlert("Question Added!");
          this.event();
          this.navCtrl.pop();
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);      
        }.bind(this))
      }.bind(this), function(){}.bind(this))
    }else{
      this.gSer.ShowAlertEvent("Do you want to update this question?", "", "Yes", "Cancel", function(){
        this.Update(function(){
          this.gSer.ShowAlert("Question Updated!");
          this.event();
          this.navCtrl.pop();
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))
      }.bind(this), function(){}.bind(this))
    }
  }
  RemoveImageEvent(img:ImageLinkStorageVM){
    this.gSer.ShowAlertEvent("Do you want to remove this Image?", "", "Yes", "Cancel", function(){
      this.RemoveImage(img, function(){
        this.gSer.ShowAlert("Image Removed!");
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
    }.bind(this), function(){}.bind(this))
  }
  //#endregion
  
  //#region func
  LoadChoices(success, failed){
    this.qqaS.GetQuestionVM(this.qmodel.ID, this.gData.applicationID, function(models){
      this.choices=models;
    }.bind(this), failed.bind(this))
  }
  Add(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qqS.Insert(this.qmodel.ID, this.qmodel.Questions, this.qiid, ""+this.order, ""+this.qmodel.Points, this.status, function(){
      success();
      load.dismiss();
    }.bind(this), function(message){
      failed(message);
      load.dismiss();
    }.bind(this))
  }
  Update(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qqS.Update(this.qmodel.ID, this.qmodel.Questions, this.qiid, ""+this.qmodel.Order, ""+this.qmodel.Points, this.status, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  RemoveChoice(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qqaS.Remove(this.selected.ID, this.qmodel.ID, this.gData.quizMakerImages, this.gData.applicationID, function(){
      this.mgS.SpliceItem(this.choices, this.selected.ID, function(list){this.choices=list;}.bind(this))
      load.dismiss();
      success();
    }.bind(this), function(message){load.dismiss(); failed(message);}.bind(this))
  }
  RemoveImage(img:ImageLinkStorageVM, success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.ilS.Remove(img.ID, this.qmodel.ID, this.gData.applicationID, function(){
      this.mgS.SpliceItem(this.images, img.ID, function(list){this.images=list;}.bind(this))
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  DiscardImages(success, failed){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Discarding images please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.ilS.RemoveID(this.qmodel.ID, this.gData.applicationID, function(){
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
    this.gSer.ShowAlertEvent("Do you want to discard changes?", "", "Yes", "Cancel", function(){
      if(this.mode==0){
        this.DiscardImages(function(){
          this.navCtrl.pop();
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))
      }else{
        this.navCtrl.pop();
      }
    }.bind(this), function(){}.bind(this))
  }
  NewChoice(){
    this.NavigateModifyChoice({mode:0, event:this.GlobalEvent.bind(this), qqid:this.qmodel.ID, isSurvey:this.isSurvey});
  }
  EditChoice(){
    this.NavigateModifyChoice({mode:1, event:this.GlobalEvent.bind(this), qqid:this.qmodel.ID, data:this.selected, isSurvey:this.isSurvey});
  }
  NavigateModifyChoice(param:any){
    this.navCtrl.push(ModifyChoicesPage, {"param":param});
  }
  //#endregion
  
  //#region popup menu
  moreMenuPopover:any;
  selected:QuizQuestionAnswerVM;
  TogglePopover(event, qi:QuizQuestionAnswerVM){
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
      this.EditChoice();
    }else if(value==2){
      //Remove Choice
      this.gSer.ShowAlertEvent("Are you sure you want to remove this choice?", "", "Yes", "Cancel", function(){
        this.RemoveChoice(function(){}.bind(this), function(message){this.gSer.ShowAlert(message);}.bind(this))
      }.bind(this), function(){})
    }
  }
  //#endregion

  //#region Global func
  GlobalEvent(){
    this.LoadChoices(function(){
      console.log(this.choices);
    }.bind(this), function(){}.bind(this))
  }
  ImageUploadReceiver(id){
    this.ilS.GetVM(id, this.qmodel.ID, this.gData.applicationID, function(model){
      this.images.push(model);
    }.bind(this), function(message){}.bind(this))
  }
  
  //#endregion
  
}
