import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//My pages
import { SettimePage } from '../settime/settime';

@IonicPage()
@Component({
  selector: 'page-selectmentor',
  templateUrl: 'selectmentor.html',
})
export class SelectmentorPage {

  subject_selected: string;
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth, public alert: AlertController, public menu: MenuController) {
    this.subject_selected = navParams.get('data');
    console.log(this.subject_selected);
    this.loadMentors();
  }

  loadMentors(){
    var r = this.db.list('/materias/'+this.subject_selected+'/asesores/').valueChanges().subscribe((d) => {
      console.log('something has changed');
      console.log(d);
      this.items = d;
    });
  }

  selectMentor(id){
    console.log("The ID is: ", id); 
    this.navCtrl.push(SettimePage, {id: id, subject: this.subject_selected});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectmentorPage');
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
