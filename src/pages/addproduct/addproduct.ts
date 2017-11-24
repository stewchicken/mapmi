import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from "../../models/product";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { ImageProvider } from "../../providers/image/image";
import { UUID } from 'angular2-uuid';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { AngularFireAuth } from "angularfire2/auth";


@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {
  product = {} as Product;
  captureDataUrl: string;
  productItemRef$: FirebaseListObservable<Product[]>;
  subscription: Subscription;

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private imageSrv: ImageProvider, private database: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
  }

  ionViewWillLeave() {
    //this.subscription.unsubscribe();
  }

  ionViewWillEnter() {
    console.log(' ionViewWillEnter() AddproductPage');
    this.productItemRef$ = this.database.list('productitems');
  }

  logout() {
    let addProductPage = this;
    this.afAuth.auth.signOut().then(function () {
      addProductPage.navCtrl.popToRoot();
    }, function (error) {
      // An error happened.
    });
  }

  onAddProduct(product: Product) {
    // debugger; if you comment it out, breakpoint will hit debugger here
    /*
      this.product.category = product.category;
     this.product.details = product.details;
     this.product.name = product.name;
     this.product.price = product.price;
     this.product.imageUrl = null;
     console.log("imagename: " + this.product.imagename);
     console.log("imageUrl: " + this.product.imageUrl);
      this.productItemRef$.push(product);
     */
    this.productItemRef$.push(
      {
        name: this.product.name,
        category: this.product.category,
        details: this.product.details,
        price: Number(this.product.price),
        imagename: this.product.imagename
      }
    );


    this.product = {} as Product;
    this.navCtrl.pop();
  }

  takePicAndUpload() {
    this.product.imagename = UUID.UUID(); //only jpg format
    this.camera.getPicture(this.cameraOptions)
      .then(data => {
        let base64Image = 'data:image/jpeg;base64,' + data;
        this.captureDataUrl = base64Image;
        return this.imageSrv.uploadImage(base64Image, 'products', this.product.imagename);
      })
      .then(data => {
        //upload is done
        console.log("imagename :" + this.product.imagename);
      });
  }
}
