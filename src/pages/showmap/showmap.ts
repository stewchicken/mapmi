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


  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase, private imageSrv: ImageProvider) {
    console.log('constructor ShowMapPage');
    this.getCurrentLocation();
  }

  ionViewDidLoad() {
    //console.log('this.mapRef' + this.mapRef);
    console.log('ionViewDidLoad ShowMapPage');
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
    this.accidentsItemRef$ = this.database.list('accidentitems');
    this.subscription = this.accidentsItemRef$.
      subscribe(
      (data: any) => {
        this.accidents = data as Accident[];
        /*
        for (let i = 0; i < this.accidents.length; i++) {
          console.log("this.accidents[i]: " + this.accidents[i]);
          this.accidents[i].imagename;
          this.accidents[i].details;
          this.accidents[i].date;
          this.accidents[i].handynumber;
          this.accidents[i].lat;
          this.accidents[i].lng;
          console.log("imagename: " + this.accidents[i].imagename);
          
                    this.imageSrv.getImage("accidents", this.accidents[i].imagename).then(
                      imageUrl => {
                        this.accidents[i].imageUrl = imageUrl;
                        console.log("imageUrl:" + this.accidents[i].imageUrl);
                      }
                    ).catch(
                      error => {
                        console.log(error);
                      }
                    );
          
      }*/
      });

  }
  getPinUrl(accident : Accident){
    console.log("accident.category: xxx "+accident.category + " : " +accident.details);
    if(accident.category=="Nobody Injured"){
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    }
    if(accident.category=="Injured"){
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }
    return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";;
  }
  
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log("lat:  " + this.lat);
      console.log("lng:  " + this.lng);
      console.log("currentDate:  " + new Date());
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter ShowmapPage');
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
    console.log("marker is clicked key ### " + accident.$key);
    console.log("marker is clicked details ### " + accident.details);
    console.log("marker is clicked date ### " + accident.date);

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
      //this.logOut();
      this.navCtrl.popToRoot()
    } else {
      console.log("user is logged in");
      return;
    }
  }


}