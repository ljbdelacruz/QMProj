import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//#region pages
import {DashboardPage} from '../dashboard/dashboard'
//#endregion
//#region services models
import {UsersServices} from '../../services/cpsAPI/userInfoService/user.service'
import {UserAccessLevelService} from '../../services/cpsAPI/userInfoService/userAccessLevel.service'
import {UsersViewModel} from '../../services/cpsAPI/userInfoService/model.model'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import {SecurityGeneratorService} from '../../services/cpsAPI/securityGeneratorService/securityGenerator.service'
//#endregion
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userInput:UsersViewModel;
  selectedTimeZone:string;
  servers:any[]=[];
  constructor(public navCtrl: NavController, private uS:UsersServices, private gData:GlobalDataService, private gSer:GeneralService,
  private ualS:UserAccessLevelService, private sgS:SecurityGeneratorService, private iab:InAppBrowser){
    this.selectedTimeZone=this.gData.selectedTimezone;
    this.userInput=new UsersViewModel();
    this.servers=this.gData.server;
  }
  ionViewDidLoad(){
  }
  LoginEvent(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Proccessing Please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.uS.Authenticate(this.userInput.EmailAddress, this.userInput.Password, this.gData.applicationID, function(data){
      this.gData.userInfo.set(data);
      this.GotoDashboad();
      load.dismiss();
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
      load.dismiss();
    }.bind(this))
  }
  //#region db func
  GetUserAccessLevel(oid:string, success, failed){
    this.ualS.GetByList(oid, this.gData.applicationID, function(vms){
      this.gData.userAccessLevel=vms;
      success();
    }.bind(this), failed.bind(this))
  }
  CreateDefaultAccessLevel(success, failed){
    this.ualS.InsertNew(this.gData.userInfo.ID, this.gData.defAL, this.gData.applicationID, ""+false, this.gData.alcid, this.selectedTimeZone, 
    function(){
      this.GetUserAccessLevel(this.gData.userInfo.ID, success.bind(this), failed.bind(this))
    }.bind(this), failed.bind(this))
  }
  //#endregion
  //#region page navigation
  GotoDashboad(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing access please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))

    this.gData.selectedTimezone=this.selectedTimeZone;
    if(this.selectedTimeZone.length > 0){
      this.GetUserAccessLevel(this.gData.userInfo.ID, function(){
        if(this.gData.userAccessLevel.length <=0){
          this.CreateDefaultAccessLevel(function(){
            this.navCtrl.push(DashboardPage);
            load.dismiss();
          }.bind(this), function(message){this.gSer.ShowAlert(message); load.dismiss()}.bind(this))
        }else{
          this.navCtrl.push(DashboardPage);
          load.dismiss();
        }
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
        load.dismiss();
      }.bind(this))

    }else{
      this.gSer.ShowAlert("Please Select Timezone");
    }
  }
  //#endregion
  //#region event catcher
  @ViewChild(Select) select:Select;
  OpenSelectTimeZone(){
    this.select.open();
  }
  SignUp(){
    const browser = this.iab.create(this.gData.signUpURL);
  }
  //#endregion

}
