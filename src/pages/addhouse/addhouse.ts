import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { House } from "../../models/house";
import { UUID } from "angular2-uuid";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImageProvider } from "../../providers/image/image";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the AddhousePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addhouse',
  templateUrl: 'addhouse.html',
})
export class AddhousePage {
  house = {} as House;
  captureDataUrl: string;
  productItemRef$: FirebaseListObservable<House[]>;
  subscription: Subscription;

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private imageSrv: ImageProvider, private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    
  }

  ionViewWillEnter() {
    console.log(' ionViewWillEnter() AddproductPage');
    this.productItemRef$ = this.database.list('houseitems');
  }

  logout() {
    this.subscription.unsubscribe();
    let addProductPage = this;
    this.afAuth.auth.signOut().then(function () {
      addProductPage.navCtrl.popToRoot();
    }, function (error) {
      // An error happened.
      console.log(error);
    });
  }

  onAddHouse(house: House) {
    console.log("imagename: " + this.house.imagename);
    console.log("imageUrl: " + this.house.imageUrl);
    this.productItemRef$.push(house);
    this.house = {} as House;
    this.navCtrl.pop();
  }

  takePicAndUpload() {
    this.house.imagename = UUID.UUID(); //only jpg format
    this.camera.getPicture(this.cameraOptions)
      .then(data => {
        let base64Image = 'data:image/jpeg;base64,' + data;
        this.captureDataUrl = base64Image;
        return this.imageSrv.uploadImage(base64Image, 'houses', this.house.imagename);
      })
      .then(data => {
        console.log("imagename :" + this.house.imagename);
      });
  }
}
