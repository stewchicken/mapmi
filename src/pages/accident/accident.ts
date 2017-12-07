import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Yan Wang
 */

@Component({
  selector: 'page-accident',
  templateUrl: 'accident.html',
})
export class AccidentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccidentPage');
  }

}
