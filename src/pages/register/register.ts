import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';

//My pages
import { WalkthroughPage } from '../walkthrough/walkthrough';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//Models
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //Variables to get the value of the inputs
  @ViewChild('fullname') fullname;
  @ViewChild('email') email;
  @ViewChild('password') password;
  user_type;
  user = {name : '', email : '', type : 0, rating: 5};

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private auth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //Function to signIn
  signIn(){
    this.setUser(this.user);
    this.auth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then( data => {
      //If the registration it's ok the sign in and insert user info into the db
      let id = this.auth.auth.currentUser.uid;
      this.db.object('/users/'+id+'/').set(this.user);
      this.auth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then( data => {
        console.log("Ya estas logeado: ", data);
        this.navCtrl.push(WalkthroughPage);
      });
    })
    .catch(error => {
      console.log("There's an error: ", error);
    })
    //this.navCtrl.push(WalkthroughPage);  
  }

  //Set the values of the user
  setUser(user){
    user.name = this.fullname.value;
    user.email = this.email.value;
    user.type = this.user_type;
    user.rating = 5;
  }

  //Function to get the type of user
  getType(type){
    this.user_type = type;
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
