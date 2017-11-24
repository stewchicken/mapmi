import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { House } from "../../models/house";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { ImageProvider } from "../../providers/image/image";
import { AddhousePage } from "../addhouse/addhouse";

/**
 * Generated class for the HousePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-house',
  templateUrl: 'house.html',
})
export class HousePage {

  houses: House[] = [];
  houseItemRef$: FirebaseListObservable<House[]>;
  subscription: Subscription;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase, private imageSrv: ImageProvider) {
    this.onAuthCallback = this.onAuthCallback.bind(this);
  }

  logout() {
    let housePage = this;
    this.afAuth.auth.signOut().then(function () {
      housePage.navCtrl.popToRoot();
    }, function (error) {
      // An error happened.
    });
  }

  

  onAuthCallback(user) {
    if (!user) {
      console.log("user is not logged in");
      //this.logOut();
      this.navCtrl.popToRoot()
    } else {
      console.log("user is logged in");
      return;
    }
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter HousePage');
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
    this.houseItemRef$ = this.database.list('houseitems');
    this.subscription = this.houseItemRef$.
      subscribe(
      (data: any) => {
        this.houses = data as House[];
        for (let i = 0; i < this.houses.length; i++) {
          this.houses[i].imagename;
          console.log("imagename: " + this.houses[i].imagename);
          this.imageSrv.getImage("houses", this.houses[i].imagename).then(
            imageUrl => {
              this.houses[i].imageUrl = imageUrl;
              console.log("imageUrl:" + this.houses[i].imageUrl);
            }
          ).catch(
            error=>{
              console.log(error);
            }
          );
        }
      });
    console.log('ionViewDidLoad HousePage');
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  navtoAddHousePage(){
        this.navCtrl.push(AddhousePage);
  }
}
