import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyChoicesPage } from './modify-choices';

@NgModule({
  declarations: [
    ModifyChoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyChoicesPage),
  ],
})
export class ModifyChoicesPageModule {}
