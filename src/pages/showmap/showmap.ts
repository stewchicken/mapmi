import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from "angularfire2/auth";
import { Accident } from "../../models/accident";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { ImageProvider } from "../../providers/image/image";
import { AddaccidentPage } from "../addaccident/addaccident";
import { AgmMap } from '@agm/core';
import { AccidentdetailsPage } from '../accidentdetails/accidentdetails';

declare var google: any;

/**
 * Generated class for the ShowmapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-showmap',
  templateUrl: 'showmap.html',
})
export class ShowmapPage {
  //@ViewChild('map') mapRef: ElementRef;

  @ViewChild(AgmMap)
  public agmMap: AgmMap


  accidents: Accident[] = [];
  accidentsItemRef$: FirebaseListObservable<Accident[]>;
  subscription: Subscription;

  title: string = 'My current Location';
  lat: number;
  lng: number;
  zoom: number = 10;
  time: Date;



  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase, private imageSrv: ImageProvider) {
    console.log('constructor ShowMapPage');

  }

  ionViewDidLoad() {
    this.getCurrentLocation();
    console.log('ionViewDidLoad ShowMapPage');
  }
  getPinUrl(accident: Accident) {
    console.log("accident.category: xxx " + accident.category + " : " + accident.details);
    if (accident.category == "Nobody Injured") {
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    }
    if (accident.category == "Injured") {
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }
    return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";;
  }

  getCurrentLocation() {
    this.time = new Date();
    //let posOptions = {timeout: 10000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log("lat/lng " + this.lat + ' / ' + this.lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  isShown(accident: Accident): boolean {
    if (accident.status == 'CLOSE') {
      return false;
    }
    else { 
      return true;
    }
  }

  // example on AccidentDetail page, if user click backbutton, it will return to ShowMapPage 
  // in this case ionViewWillEnter will be called but ionViewDidLoad will not be called
  // will from Rootpage come to ShowMapPage, ionViewDidLoad and ionViewWillEnter both will be called
  ionViewWillEnter() {
    console.log('ionViewWillEnter ShowmapPage');
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
    this.accidentsItemRef$ = this.database.list('accidentitems');
    this.subscription = this.accidentsItemRef$.
      subscribe(
      (data: any) => {
        this.accidents = data as Accident[];
      });
    // this.agmMap.triggerResize();
  }

  ionViewWillLeave() {
    //this.subscription.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navtoAddAccidentPage() {
    this.navCtrl.push(AddaccidentPage);
  }

  clickMarker(accident: Accident) {

    this.navCtrl.push(AccidentdetailsPage, {
      accidentkey: accident.$key
    });

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
      this.navCtrl.popToRoot()
    } else {
      console.log("user is logged in");
      return;
    }
  }


}
