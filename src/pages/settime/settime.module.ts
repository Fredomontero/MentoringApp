import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettimePage } from './settime';

@NgModule({
  declarations: [
    SettimePage,
  ],
  imports: [
    IonicPageModule.forChild(SettimePage),
  ],
})
export class SettimePageModule {}
