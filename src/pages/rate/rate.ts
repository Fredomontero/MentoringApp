import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {

  star_array:HTMLImageElement[] = new Array(5);
  score = {rate: 0, mentor: '', subject : '', date: '', comment: '', student: ''};
  user_type;
  appointment;
  comment;
  username;
  student;
  mentor;
  score_student;
  score_mentor;
  idx: number;
  rate: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.appointment = navParams.get('data');
    this.user_type = navParams.get('type');
    this.getUsername();
    this.getStudent();
    this.getMentor();
    this.getStudentScore();
    this.getMentorScore();
    console.log(this.appointment);
    console.log("The type is: ", this.user_type);
  }

  getButtons(){
    for(this.idx = 0; this.idx<5; this.idx++){
      this.star_array[this.idx] = document.getElementById("s"+this.idx+"") as HTMLImageElement;
    }
  }

  getMentor(){
    this.db.object('/users/'+this.appointment.mentor_id+'/').valueChanges().subscribe((d) => {
      this.mentor = d;
    });
  }

  getStudent(){
    this.db.object('/users/'+this.appointment.student_id+'/').valueChanges().subscribe((d) => {
      this.student = d;
    });
  }

  getStudentScore(){
    this.db.list('/users/'+this.appointment.student_id+'/scores/').valueChanges().subscribe((d) => {
      this.score_student = d;
    });
  }

  getMentorScore(){
    this.db.list('/users/'+this.appointment.mentor_id+'/scores/').valueChanges().subscribe((d) => {
      this.score_mentor = d;
    });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');
  }

  setRating(idx: number){
    this.getButtons();
    for(var i = 0; i<5; i++){
      if(i <= idx){
        this.star_array[i].src = "../../assets/imgs/star_4.png";
      }else{
        this.star_array[i].src = "../../assets/imgs/star_0.png";
      }
    }
    this.rate = idx+1;
  }

  sendRate(){
    this.score.rate = this.rate;
    this.score.mentor = this.appointment.mentor;
    this.score.subject = this.appointment.subject;
    this.score.comment = this.comment;
    this.score.date = this.appointment.date;
    this.score.student = this.appointment.student;
    if(this.user_type == 1){
      console.log("Removing the appointment: ", this.appointment);
      var new_rate = (this.student.rating+this.rate)/((this.score_student.length+1));
      this.db.list('/users/').update('/'+this.appointment.student_id+'/',{rating:Math.ceil(new_rate)});
      this.db.list('/users/'+this.appointment.mentor_id+'/appointmentstx/'+this.appointment.id+'/').remove();
      this.db.object('/users/'+this.appointment.student_id+'/scores/'+this.appointment.id+'/').set(this.score);
    }else{
      console.log("Removing the appointment: ", this.appointment);
      var new_rate = (this.mentor.rating+this.rate)/((this.score_mentor.length)+1);
      this.db.list('/users/').update('/'+this.appointment.mentor_id+'/',{rating:Math.ceil(new_rate)});
      this.db.list('/users/'+this.appointment.student_id+'/appointmentsrx/'+this.appointment.id+'/').remove();
      this.db.object('/users/'+this.appointment.mentor_id+'/scores/'+this.appointment.id+'/').set(this.score);
    }
   
  }


}
