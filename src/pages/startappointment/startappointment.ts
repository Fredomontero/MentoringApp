import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//My pages
import { MentorhomePage } from '../mentorhome/mentorhome';
import { StudenthomePage } from '../studenthome/studenthome';
import { RatePage } from '../rate/rate';


@IonicPage()
@Component({
  selector: 'page-startappointment',
  templateUrl: 'startappointment.html',
})

export class StartappointmentPage {

  appointment;
  user_type;
  username;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    console.log("Constructor reached");
    this.appointment = navParams.get('data');
    this.user_type = navParams.get('type');
    this.getUsername();
    console.log(this.appointment);
    console.log("the type is: ",this.user_type);    
  }

  //When the appointments ends succesfully
  finishAppointment(){
    this.navCtrl.push(RatePage, {data: this.appointment, type:this.user_type});
  }

  getUsername(){
    console.log("The type is: ", this.user_type);
    console.log("And the username is: ", this.username);
    if(this.user_type == 1){
      this.username = this.appointment.student;
    }else{
      this.username = this.appointment.mentor;
    }
  }

  //When the user cancels the appointment
  cancelAppointment(){
    if(this.user_type == 1){
      this.navCtrl.push(MentorhomePage);
    }else{
      this.navCtrl.push(StudenthomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartappointmentPage');
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  //This is to let other pages to have access to the menu  
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  //To open and close the menu
  toogleMenu(){
    this.menu.toggle();
  }

}
