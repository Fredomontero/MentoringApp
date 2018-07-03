import { Component, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//My pages
import { AddsubjectPage } from '../addsubject/addsubject';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  items;
  current_user;
  user_id;
  user_type;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth, public menu: MenuController) {
    console.log("Constructor reached");
    this.user_type = 0;
    this.user_id = this.auth.auth.currentUser.uid;
    this.loadUser();
    this.loadSubjects();
  }

  loadSubjects(){
    var r = this.db.list('/users/'+this.user_id+'/materias/').valueChanges().subscribe((d) => {
      console.log('something has changed');
      console.log(d);
      this.items = d;
    });
  }

  loadUser(){
    var r = this.db.object('/users/'+this.user_id+'/').valueChanges().subscribe((d) => {
      this.current_user = d;
      console.log("Ya obtuvimos el tipo");
      this.user_type = this.current_user.type;
    });
  }

  ionViewDidEnter(){
    this.loadSubjects();
    this.menu.swipeEnable(false);
  }

  removeThisSubject(name){
    const itemsRef = this.db.list('/users/'+this.user_id+'/materias/'+name+'/');
    itemsRef.remove();
  }

  addSubectsPage(){
    this.navCtrl.push(AddsubjectPage);
  }

  ionViewDidLoad() {
  }

  //This is to let other pages to have access to the menu  
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

}
