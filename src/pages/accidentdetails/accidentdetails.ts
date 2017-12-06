import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Accident } from '../../models/accident';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { AngularFireAuth } from "angularfire2/auth";
import { ImageProvider } from '../../providers/image/image';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-accidentdetails',
  templateUrl: 'accidentdetails.html',
})
export class AccidentdetailsPage {
  accident: Accident = {} as Accident;
  accidentItemRef$: Observable<Accident>;
  subscription: Subscription;
  accidentkey: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private imageSrv: ImageProvider, private database: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    this.accidentkey = this.navParams.get('accidentkey');
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter ShowmapPage');
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
    this.accidentItemRef$ = this.database.object('accidentitems/' + this.accidentkey);
    this.subscription = this.accidentItemRef$.
      subscribe(
      (data: any) => {
        console.log(data);
        let dataaccident = data as Accident;
        this.accident.$key = dataaccident.$key;
        this.accident.imagename = dataaccident.imagename;
        this.accident.details = dataaccident.details;
        this.accident.date = dataaccident.date;
        this.accident.handynumber = dataaccident.handynumber;
        this.accident.lat = dataaccident.lat;
        this.accident.lng = data.lng;
        this.accident.category = data.category;
        this.accident.status = data.status;
        console.log("imagename: " + this.accident.imagename);
        this.imageSrv.getImage("accidents", this.accident.imagename).then(
          imageUrl => {
            this.accident.imageUrl = imageUrl;
            console.log("imageUrl:" + this.accident.imageUrl);
          }
        ).catch(
          error => {
            console.log(error);
          });
      });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccidentdetailsPage');

  }
  onAuthCallback(user) {
    if (!user) {
      console.log("user is not logged in");
      this.navCtrl.popToRoot()
    } else {
      console.log("user is logged in");
      return;
    }
  }

  logout() {
    this.subscription.unsubscribe();
    let accidentDetailPage = this;
    this.afAuth.auth.signOut().then(function () {
      accidentDetailPage.navCtrl.popToRoot();
    }, function (error) {
      console.log(error);
    });
  }
}
