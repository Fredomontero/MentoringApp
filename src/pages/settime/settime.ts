import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-settime',
  templateUrl: 'settime.html',
})
export class SettimePage {

  user_id;                    //Mentor's Id
  student_id;                 //Student's Id
  subject_selected;           //Subject
  student;                    //Student
  mentor;                     //Mentor
  id;
  appointment = {id: '', student: '', student_id: '', mentor: '', mentor_id: '', subject: '', date: '', start: '', end: '', state: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth, public menu: MenuController ) {
    this.user_id = navParams.get('id');
    this.subject_selected = navParams.get('subject');
    this.getStudentData();
    this.getMentor();
  }

  sendRequest(){
    this.appointment.student = this.student.name;
    this.appointment.mentor = this.mentor.name;
    this.appointment.mentor_id = this.user_id;
    this.appointment.subject = this.subject_selected;
    this.appointment.student_id = this.student_id;
    this.appointment.state = '0';
    this.id = this.appointment.mentor+this.appointment.date+this.appointment.start+this.appointment.subject;
    this.id.replace(/\s/g, '');
    this.appointment.id = this.id;
    console.log("The appointment info is: ", this.appointment);
    //Setting appointment to the mentor
    this.db.object('/users/'+this.user_id+'/appointmentstx/'+this.id+'/').set(this.appointment);
    //Setting appointment to the student
    this.db.object('/users/'+this.student_id+'/appointmentsrx/'+this.id+'/').set(this.appointment);
  }

  getStudentData(){
    this.student_id = this.auth.auth.currentUser.uid;
    var r = this.db.object('/users/'+this.student_id+'/').valueChanges().subscribe((d) => {
      this.student = d;
    });
  }

  getMentor(){
    var r = this.db.object('/users/'+this.user_id+'/').valueChanges().subscribe((d) => {
      this.mentor = d;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettimePage');
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
