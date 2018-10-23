import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewQuizInfoListPage } from './view-quiz-info-list';

@NgModule({
  declarations: [
    ViewQuizInfoListPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewQuizInfoListPage),
  ],
})
export class ViewQuizInfoListPageModule {}
