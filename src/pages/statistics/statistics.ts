import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  user_id;
  comments_list;
  user;
  username = '';
  role = '';
  idx;
  star_array:HTMLImageElement[] = new Array(5);
  temp_rate;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.user_id = auth.auth.currentUser.uid;
    this.getUser();
    this.getComments();
  }

  getUser(){
    this.db.object('/users/'+this.user_id+'/').valueChanges().subscribe((d) => {
      this.user = d;
      this.username = this.user.name;
      if(this.user.type == 1){
        this.role = 'Estudiante'
      }else{
        this.role = 'Asesor'
      }
      this.temp_rate = this.user.rating*4;
      this.drawRating(this.temp_rate);
    });
  }

  ionViewDidEnter(){
    this.temp_rate = this.user.rating*4;
    this.drawRating(this.temp_rate);
  }

  ionViewWillEnter(){
    this.temp_rate = this.user.rating*4;
    this.drawRating(this.temp_rate);
  }

  getComments(){
    this.db.list('/users/'+this.user_id+'/scores/').valueChanges().subscribe((d) => {
      this.comments_list = d;
    });
  }

  drawRating(rate: number){
    var temp = rate;
    for(this.idx = 0; this.idx<5; this.idx++){
      this.star_array[this.idx] = document.getElementById("s"+this.idx+"") as HTMLImageElement;
      if(temp >= 4){
        this.star_array[this.idx].src = "../../assets/imgs/star_4.png";
      }else{
        this.star_array[this.idx].src = "../../assets/imgs/star_"+temp%4+".png";
      }
      temp -= 4;
    }
    temp = rate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

}
