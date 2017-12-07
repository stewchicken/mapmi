import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Accident } from "../../models/accident";
import { UUID } from "angular2-uuid";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImageProvider } from "../../providers/image/image";
import { AngularFireAuth } from "angularfire2/auth";
import { Geolocation } from '@ionic-native/geolocation';
import { ShowmapPage } from '../showmap/showmap';
import { Sim } from '@ionic-native/sim';
/**
 * Yan Wang
 */

@Component({
  selector: 'page-addaccident',
  templateUrl: 'addaccident.html',
})
export class AddaccidentPage {

  accident = {} as Accident;
  captureDataUrl: string;
  accidentsItemRef$: FirebaseListObservable<Accident[]>;
  subscription: Subscription;
  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private sim: Sim, public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera, private imageSrv: ImageProvider, private database: AngularFireDatabase,
    private afAuth: AngularFireAuth, private geolocation: Geolocation) {
  }

  ionViewWillEnter() {
    console.log(' ionViewWillEnter() AddaccidentPage ');
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
    this.accidentsItemRef$ = this.database.list('accidentitems');
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

  onAddAccident(accident: Accident) {

    this.geolocation.getCurrentPosition().then((resp) => {
      let location = { lat: resp.coords.latitude, lng: resp.coords.longitude };
      accident.lat = resp.coords.latitude;
      accident.lng = resp.coords.longitude;
      console.log("imagename: " + this.accident.imagename);
      console.log("imageUrl: " + this.accident.imageUrl);
      let tmpDate = new Date();
      accident.date = tmpDate.toLocaleDateString() + " " + tmpDate.toLocaleTimeString();
      accident.status = 'NEW';
      this.accidentsItemRef$.push(accident);
      this.accident = {} as Accident;
      this.navCtrl.push(ShowmapPage);
      //this.navCtrl.pop();

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
  //at Android platform does not work well, could not get handy number from SIMCard
  getHandyNumberFromSim() {
    this.sim.getSimInfo().then(
      (info) => {
        this.sim.getSimInfo().then(
          (info) => {
            this.accident.handynumber=info.phoneNumber;
            console.log('Sim info: ', info);
          },
          (err) => console.log('Unable to get sim info: ', err)
        );
        console.log('Sim info: ', info)
      },
      (err) => console.log('Unable to get sim info: ', err)
    );
  }


  takePicAndUpload() {
    this.accident.imagename = UUID.UUID(); //only jpg format
    this.camera.getPicture(this.cameraOptions)
      .then(data => {
        let base64Image = 'data:image/jpeg;base64,' + data;
        this.captureDataUrl = base64Image;
        return this.imageSrv.uploadImage(base64Image, 'accidents', this.accident.imagename);
      })
      .then(data => {
        console.log("imagename :" + this.accident.imagename);
      });
  }

  logout() {
    this.subscription.unsubscribe();
    let addaccidentPage = this;
    this.afAuth.auth.signOut().then(function () {
      addaccidentPage.navCtrl.popToRoot();
    }, function (error) {
      console.log(error);
    });
  }

}
