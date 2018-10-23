import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckQuizPage } from './check-quiz';

@NgModule({
  declarations: [
    CheckQuizPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckQuizPage),
  ],
})
export class CheckQuizPageModule {}
