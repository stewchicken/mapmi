import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsPage } from "../products/products";
import { HousePage } from "../house/house";
import { ShowmapPage } from "../showmap/showmap";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private afAuth: AngularFireAuth) {
  }

  logout() {
    let menuPage=this;
    this.afAuth.auth.signOut().then(function () {
      menuPage.navCtrl.popToRoot();
    }, function (error) {
      // An error happened.
      console.log(error);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  navtoProduct() {
    this.navCtrl.push(ProductsPage);
  }

  navtoHouse() {
    this.navCtrl.push(HousePage);
  }

  navtoMap() {
    this.navCtrl.push(ShowmapPage);
  }
}
