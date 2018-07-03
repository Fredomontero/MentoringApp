import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { OrderPipe } from 'ngx-order-pipe';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//My models
import { User } from '../../models/user.model';
import { Appointments } from '../../models/appointments.model';
import { Subject } from '../../models/subject.model';
import { christian } from '../../temporal/db';

//My pages
import { StartappointmentPage } from '../startappointment/startappointment';


@IonicPage()
@Component({
  selector: 'page-mentorhome',
  templateUrl: 'mentorhome.html',
})
export class MentorhomePage {

  mentor;
  uid;
  appointment_list;
  request_list;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private db:  AngularFireDatabase, private auth: AngularFireAuth ) {
    console.log("Constructor reached");
    this.uid = this.auth.auth.currentUser.uid;
    this.getMentor();
    this.loadRequests();
    this.loadAppointments();
  }

  loadRequests(){
    //Since we have orderByChild(key == state) equal to (value == 0 [approved]) we'll only see the classes requested for the mentor
    var r = this.db.list('/users/'+this.uid+'/appointmentstx/', ref => ref.orderByChild('state').equalTo('0')).valueChanges().subscribe((d) => {
      this.request_list = d;
    });
  }

  loadAppointments(){
    //Since we have orderByChild(key == state) equal to (value == 1 [approved]) we'll only see the classes aproved by the mentor
    var r = this.db.list('/users/'+this.uid+'/appointmentstx/', ref => ref.orderByChild('state').equalTo('1')).valueChanges().subscribe((d) => {
      this.appointment_list = d;
    });
  }

  getMentor(){
    this.db.object('/users/'+this.uid+'/').valueChanges().subscribe((d) => {
      this.mentor = d;
      console.log(this.mentor);
    });
  }

  acceptRequest(request){
    console.log(request);
    var mentor_ref = this.db.list('/users/'+request.mentor_id+'/appointmentstx/').update('/'+request.id+'/',{state:"1"});
    var student_ref = this.db.list('/users/'+request.student_id+'/appointmentsrx/').update('/'+request.id+'/',{state:"1"});
  }

  deleteRequest(request){
    var mentor_ref = this.db.list('/users/'+request.mentor_id+'/appointmentstx/'+request.id+'/').remove();
    var student_ref = this.db.list('/users/'+request.student_id+'/appointmentsrx/'+request.id+'/').remove();
  }

  removeAppointment(appointment){
    var mentor_ref = this.db.list('/users/'+appointment.mentor_id+'/appointmentstx/'+appointment.id+'/').remove();
    var student_ref = this.db.list('/users/'+appointment.student_id+'/appointmentsrx/'+appointment.id+'/').remove();
  }

  startAppointment(appointment){
    this.navCtrl.push(StartappointmentPage, {data:appointment, type:this.mentor.type})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MentorhomePage');
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

  ngAfterViewInit(){
    console.log("The user now is: ");
    console.log(this.auth.auth.currentUser);
  }

}
