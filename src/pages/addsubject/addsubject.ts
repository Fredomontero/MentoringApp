import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-addsubject',
  templateUrl: 'addsubject.html',
})
export class AddsubjectPage {

  items;
  user;
  mentor = {name : '', rating : 0, id: ''};
  subject = {name : '', id : 0};

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth, public menu: MenuController) {
    console.log("Constructor reached");
    this.getUser();
    this.loadSubjects();
  }

  loadSubjects(){
    var r = this.db.list('materias').valueChanges().subscribe((d) => {
      console.log('something has changed');
      console.log(d); // <- Sergio  Do some magic here]\
      this.items = d;
    });
  }

  getUser(){
    let uid = this.auth.auth.currentUser.uid;
    var r = this.db.object('/users/'+uid+'/').valueChanges().subscribe((d) => {
      this.user = d;
      this.mentor.name = this.user.name;
      this.mentor.rating = this.user.rating;
      this.mentor.id = uid;
    });
  }

  addThisSubject(name, id){
    let uid = this.auth.auth.currentUser.uid;
    this.setSubject(name, id);
    this.db.object('/users/'+uid+'/materias/'+name+'/').set(this.subject);
    this.db.object('/materias/'+name+'/asesores/'+uid+'/').set(this.mentor);
  }

  setSubject(name, id){
    this.subject.name = name;
    this.subject.id = id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsubjectPage');
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  //This is to let other pages to have access to the menu  
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

}
