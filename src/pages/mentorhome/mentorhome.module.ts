import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentorhomePage } from './mentorhome';

@NgModule({
  declarations: [
    MentorhomePage,
  ],
  imports: [
    IonicPageModule.forChild(MentorhomePage),
  ],
})
export class MentorhomePageModule {}
