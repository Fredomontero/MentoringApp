import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { OrderModule } from 'ngx-order-pipe';

//My pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MentorhomePage } from '../pages/mentorhome/mentorhome';
import { RegisterPage } from '../pages/register/register';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { PaymentPage } from '../pages/payment/payment';
import { SettingsPage } from '../pages/settings/settings';
import { StatisticsPage } from '../pages/statistics/statistics';
import { AddsubjectPage } from '../pages/addsubject/addsubject';
import { StudenthomePage } from '../pages/studenthome/studenthome';
import { RequestclassPage } from '../pages/requestclass/requestclass';
import { SelectmentorPage } from '../pages/selectmentor/selectmentor';
import { SettimePage } from '../pages/settime/settime';
import { StartappointmentPage } from '../pages/startappointment/startappointment';
import { RatePage } from '../pages/rate/rate';
import { AddcardPage } from '../pages/addcard/addcard';

//Firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

var config = {
  apiKey: "AIzaSyCkkVOE1BuHtGbxl9mKmOBA01S9PuKGd9U",
  authDomain: "mentoring-app-e07c0.firebaseapp.com",
  databaseURL: "https://mentoring-app-e07c0.firebaseio.com",
  projectId: "mentoring-app-e07c0",
  storageBucket: "mentoring-app-e07c0.appspot.com",
  messagingSenderId: "311144225876"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MentorhomePage,
    RegisterPage,
    WalkthroughPage,
    PaymentPage,
    SettingsPage,
    StatisticsPage,
    AddsubjectPage,
    StudenthomePage,
    RequestclassPage,
    SelectmentorPage,
    SettimePage,
    StartappointmentPage,
    RatePage,
    AddcardPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    OrderModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, 
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MentorhomePage,
    RegisterPage,
    WalkthroughPage,
    PaymentPage,
    SettingsPage,
    StatisticsPage,
    AddsubjectPage,
    StudenthomePage,
    RequestclassPage,
    SelectmentorPage,
    SettimePage,
    StartappointmentPage,
    RatePage,
    AddcardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
