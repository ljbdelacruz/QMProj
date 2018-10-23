import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyQuestionPage } from './modify-question';

@NgModule({
  declarations: [
    ModifyQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyQuestionPage),
  ],
})
export class ModifyQuestionPageModule {}
