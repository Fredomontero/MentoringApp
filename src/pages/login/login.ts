import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';

//My pages
import { RegisterPage } from '../register/register';
import { MentorhomePage } from '../mentorhome/mentorhome';
import { StudenthomePage } from '../studenthome/studenthome';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Variables to get the value of the inputs
  @ViewChild('email') email;
  @ViewChild('password') password;
  errorMessage: string;
  type: number;
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private auth: AngularFireAuth, public alertCtrl: AlertController, private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //function to login
 login(){
    this.auth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    //this.auth.auth.signInWithEmailAndPassword('alfredo@mail.com', 'holamundo')
    .then(data => {
      let uid = this.auth.auth.currentUser.uid;
      var r = this.db.object('/users/'+uid+'/').valueChanges().subscribe((d) => {
        this.items = d;
        this.type = this.items.type;
        if(this.type == 0){
          console.log("Estudiante");
          this.navCtrl.push(StudenthomePage);
        }else{
          console.log("Asesor");
          this.navCtrl.push(MentorhomePage);
        }
      });
    })
    .catch(error => {
      this.displayErrorInfo(error);
    });
  } 

  //Function to display the error message of a failed login
  displayErrorInfo(error: any){
    if(error.code == "auth/user-not-found"){
      this.errorMessage =  "Correo electronico no valido";
    }else{
      this.errorMessage = "Constraseña incorrecta";
    }
    let alert = this.alertCtrl.create({
      title: 'error',
      subTitle: this.errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }

  //Function to signIn
  signup(){
    this.navCtrl.push(RegisterPage);
  }

  //To remove the swipe menu in this page
  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  //This is to let other pages to have access to the menu  
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  ngAfterViewInit(){
    console.log("The user now is: ");
    console.log(this.auth.auth.currentUser);
  }

}
