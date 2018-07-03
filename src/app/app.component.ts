import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//My pages
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PaymentPage } from '../pages/payment/payment';
import { SettingsPage } from '../pages/settings/settings';
import { StatisticsPage } from '../pages/statistics/statistics';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;
  items;
  type;

  @ViewChild(Nav) navCtrl: Nav;
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, public alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menu: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPaymentPage(){
    this.menu.close();
    this.navCtrl.push(PaymentPage);
  }

  openSettingsPage(){
    this.menu.close();
    this.navCtrl.push(SettingsPage, {data:this.type});
  }

  openStatisticsPage(){
    this.menu.close();
    this.navCtrl.push(StatisticsPage);
  }

  //More methods
  logout(){
    this.auth.auth.signOut();
    this.menu.close();
    this.navCtrl.push(LoginPage);
  }

}

