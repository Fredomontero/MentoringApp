import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-addcard',
  templateUrl: 'addcard.html',
})
export class AddcardPage {

  user_id;
  card = {card_number: '', exp_date: '', cvv_number: '', type: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.user_id = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcardPage');
  }

  saveCard(){
    if(this.card.card_number.substring(0,4) == '5579'){
      this.card.type = 'master';
    }else{
      this.card.type = 'visa';
    }
    this.db.object('/users/'+this.user_id+'/cards/'+this.card.card_number+'/').set(this.card);
  }

}
