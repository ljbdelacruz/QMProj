import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewQuizInfoListPage} from '../view-quiz-info-list/view-quiz-info-list'
import {GlobalDataService} from '../../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html',
})
export class ToolsPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolsPage');
  }
  

  //#region page navigation
  Close(){
    this.navCtrl.pop();
  }
  ViewQuizList(){
    this.OpenQuizInfo(0);
  }
  OpenQuizInfo(mode:number){
    this.navCtrl.push(ViewQuizInfoListPage, {"param":{uid:this.gData.userInfo.ID, mode:mode}});
  }
  //#endregion
}
