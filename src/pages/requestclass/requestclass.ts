import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//My pages
import { SelectmentorPage } from '../selectmentor/selectmentor';

@IonicPage()
@Component({
  selector: 'page-requestclass',
  templateUrl: 'requestclass.html',
})
export class RequestclassPage {

  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth, public menu: MenuController) {
    this.loadSubjects();
  }

  loadSubjects(){
    var r = this.db.list('materias').valueChanges().subscribe((d) => {
      console.log('something has changed');
      console.log(d);
      this.items = d;
    });
  }

  goToMentorPage(name){
    this.navCtrl.push(SelectmentorPage, {data:name});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestclassPage');
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
