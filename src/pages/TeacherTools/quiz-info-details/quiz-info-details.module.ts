import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizInfoDetailsPage } from './quiz-info-details';

@NgModule({
  declarations: [
    QuizInfoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizInfoDetailsPage),
  ],
})
export class QuizInfoDetailsPageModule {}
