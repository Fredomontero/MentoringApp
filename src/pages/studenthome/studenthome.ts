import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//My pages
import { RequestclassPage } from '../requestclass/requestclass';
import { StartappointmentPage } from '../startappointment/startappointment';

@IonicPage()
@Component({
  selector: 'page-studenthome',
  templateUrl: 'studenthome.html',
})
export class StudenthomePage {

  appointment_list;
  request_list;
  student;
  student_id;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth, private menu: MenuController) {
    this.student_id = this.auth.auth.currentUser.uid;
    this.loadAppointments();
    this.loadRequests();
    this.getStudent();
  }

  loadAppointments(){
    this.db.list('/users/'+this.student_id+'/appointmentsrx/', ref => ref.orderByChild('state').equalTo('1')).valueChanges().subscribe((d) => {
      this.appointment_list = d;
    });
  }

  loadRequests(){
    //Since we have orderByChild(key == state) equal to (value == 0 [approved]) we'll only see the classes requested for the mentor
    this.db.list('/users/'+this.student_id+'/appointmentsrx/', ref => ref.orderByChild('state').equalTo('0')).valueChanges().subscribe((d) => {
      this.request_list = d;
    });
  }

  getStudent(){
    this.db.object('/users/'+this.student_id+'/').valueChanges().subscribe((d) => {
      this.student = d;
      console.log(this.student);
    });
  }

  requestAppointment(){
    this.navCtrl.push(RequestclassPage);
  }

  startAppointment(appointment){
    console.log("The type before send is: ",this.student.type);
    this.navCtrl.push(StartappointmentPage, {data:appointment, type:this.student.type})
  }

  removeAppointment(appointment){
    var mentor_ref = this.db.list('/users/'+appointment.mentor_id+'/appointmentstx/'+appointment.id+'/').remove();
    var student_ref = this.db.list('/users/'+appointment.student_id+'/appointmentsrx/'+appointment.id+'/').remove();
  }

  removeRequest(request){
    this.db.list('/users/'+request.mentor_id+'/appointmentstx/'+request.id+'/').remove();
    this.db.list('/users/'+request.student_id+'/appointmentsrx/'+request.id+'/').remove();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudenthomePage');
  }

  //To open and close the menu
  toogleMenu(){
    this.menu.toggle();
  }

  //To remove the swipe menu in this page
  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  //This is to let other pages to have access to the menu  
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

}
