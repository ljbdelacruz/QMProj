//#region imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuizQuestionAnswerService} from '../../../services/cpsAPI/quizMakerService/quizQuestionAnswer.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import {GeneralService} from '../../../services/general.service'
import {SecurityGeneratorService} from '../../../services/cpsAPI/securityGeneratorService/securityGenerator.service'
import { QuizQuestionAnswerVM } from '../../../services/cpsAPI/quizMakerService/model.model';
import { ImageLinkStorageVM } from '../../../services/cpsAPI/imageLinkStorageService/model.model';
import {ImageLinkStorageService} from '../../../services/cpsAPI/imageLinkStorageService/imageLinkStorage.service'
import {MyGeneralService} from '../../../services/cpsAPI/general/general.service'
//#endregion

@IonicPage()
@Component({
  selector: 'page-modify-choices',
  templateUrl: 'modify-choices.html',
})
export class ModifyChoicesPage {
  
  qqid:string;
  qaModel:QuizQuestionAnswerVM;
  mode:number=0;
  event:any;
  images:ImageLinkStorageVM[]=[];
  //cid=categoryID for quizMaker
  cid:string;
  url:string;
  imgPath:string;
  isSurvey:boolean=false;
  //0-add, 1-edit
  //#region const
  constructor(public navCtrl: NavController, public navParams: NavParams, private qqaS:QuizQuestionAnswerService,
  private gData:GlobalDataService, private gS:GeneralService, private scgS:SecurityGeneratorService, private ilsS:ImageLinkStorageService, private mgS:MyGeneralService){
    this.imgPath=this.gData.imgPath;
    this.url=this.gData.cpsURL;
    this.cid=this.gData.quizMakerImages;
    this.qaModel=new QuizQuestionAnswerVM();
    this.qqid="";
    var param=this.navParams.get("param");
    this.mode=param.mode;
    this.qqid=param.qqid;
    this.event=param.event;
    this.isSurvey=param.isSurvey;
    if(this.mode==0){
      this.scgS.GetID(function(id){
        this.qaModel.ID=id;
      }.bind(this), function(){}.bind(this))
      this.images=[];
    }else{
       this.qaModel=param.data;     
       this.images=this.qaModel.Images;
       this.LoadImages(function(){}.bind(this), function(message){this.gS.ShowAlert(message);}.bind(this))
    }
  }
  //#endregion
  //#region db func
  Insert(success, failed){
    var load;
    this.gS.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qqaS.Insert(this.qaModel.ID, this.qaModel.Description, ""+this.qaModel.Points, ""+this.qaModel.isCorrect, this.qqid, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  Update(success, failed){
    var load;
    this.gS.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qqaS.Update(this.qaModel.ID, this.qaModel.Description, ""+this.qaModel.Points, ""+this.qaModel.isCorrect, this.qqid, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      failed(message);
      load.dismiss();
    }.bind(this))
  }
  
  RemoveImage(img:ImageLinkStorageVM, success, failed){
    var load;
    this.gS.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.ilsS.Remove(img.ID, this.qaModel.ID, this.gData.applicationID, function(){
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
    this.gS.ShowLoadingCtrlInstance("Discarding images please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.ilsS.RemoveID(this.qaModel.ID, this.gData.applicationID, function(){
      load.dismiss();
      success();
    }.bind(this), function(message){
      load.dismiss();
      failed(message);
    }.bind(this))
  }
  LoadImages(success, failed){
    this.ilsS.GetOwnerVM(this.qaModel.ID, this.gData.applicationID, function(list){
      this.images=list;
      success();
    }.bind(this), failed.bind(this))
  }
  //#endregion
  //#region page navigation
  Close(){
    if(this.mode==0){
      this.gS.ShowAlertEvent("Do you want to discard changes?", "", "Yes", "Cancel", function(){
        this.DiscardImages(function(){
          this.navCtrl.pop();
        }.bind(this), function(){}.bind(this))
      }.bind(this), function(){}.bind(this))
    }else{
      this.navCtrl.pop();
    }
  }
  //#endregion
  //#region event catcher
  SaveChanges(){
    if(this.mode==0){
      this.Insert(function(){
        this.gS.ShowAlert("Added new choice!");
        this.event();
        this.navCtrl.pop();
      }.bind(this), function(message){
        this.gS.ShowAlert(message);
      }.bind(this))
    }else if(this.mode==1){
      this.Update(function(){
        this.gS.ShowAlert("Updated!");
        this.navCtrl.pop();
      }.bind(this), function(message){this.gS.ShowAlert(message);}.bind(this))
    }
  }
  RemoveImageEvent(img:ImageLinkStorageVM){
    this.gS.ShowAlertEvent("Do you want to remove this image?", "", "Yes", "Cancel", 
    function(){
      this.RemoveImage(img, function(){
        this.gS.ShowAlert("Image Removed!");
      }.bind(this), function(message){
        this.gS.ShowAlert(message);
      }.bind(this))
    }.bind(this), function(){}.bind(this))
  }
  ImageUploadReceiver(id){
    this.ilsS.GetVM(id, this.qaModel.ID, this.gData.applicationID, function(model){
      this.images.push(model);
    }.bind(this), function(){}.bind(this))
  }

  //#endregion
}
