import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//My pages
import { AddcardPage } from '../addcard/addcard';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  user_id;
  bankcards_list;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.user_id = this.auth.auth.currentUser.uid;
    this.loadBankCards();
  }

  loadBankCards(){
    this.db.list('/users/'+this.user_id+'/cards/').valueChanges().subscribe((d) => {
      console.log(d);
      this.bankcards_list = d;
    });
  }

  addNewCard(){
    this.navCtrl.push(AddcardPage, {data: this.user_id});
  }

  deleteCard(card){
    this.db.list('/users/'+this.user_id+'/cards/'+card.card_number+'/').remove();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
