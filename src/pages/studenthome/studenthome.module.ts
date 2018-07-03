import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudenthomePage } from './studenthome';

@NgModule({
  declarations: [
    StudenthomePage,
  ],
  imports: [
    IonicPageModule.forChild(StudenthomePage),
  ],
})
export class StudenthomePageModule {}
