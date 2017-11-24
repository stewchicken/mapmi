import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddproductPage } from "../addproduct/addproduct";
//import * as firebase from 'firebase';
import { Product } from "../../models/product";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { ImageProvider } from "../../providers/image/image";
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  products: Product[] = [];
  productItemRef$: FirebaseListObservable<Product[]>;
  subscription: Subscription;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase, private imageSrv: ImageProvider, private afAuth: AngularFireAuth) {
    this.onAuthCallback = this.onAuthCallback.bind(this);
  }

  logout() {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    let productPage = this;
    this.afAuth.auth.signOut().then(function () {
      productPage.navCtrl.popToRoot();
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
    // When the callback is triggered, it will have the 
    // proper value for 'this'.
    this.products = [] as Product[];
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
    this.productItemRef$ = this.database.list('productitems');
    this.subscription = this.productItemRef$.
      subscribe(
      (data: any) => {
        console.log(data.length);
        for (let j = 0; j < data.length; j++) {
          //scope of let variable
          let tmpproduct = {} as Product;
          tmpproduct.$key = data[j].$key;
          tmpproduct.category = data[j].category;
          tmpproduct.name = data[j].name;
          tmpproduct.imagename = data[j].imagename;
          tmpproduct.price = data[j].price;
          console.log("prdouct: " + tmpproduct.name + " imagename: " + tmpproduct.imagename);
          this.imageSrv.getImage("products", tmpproduct.imagename).then(
            imageUrl => {
              tmpproduct.imageUrl = imageUrl;
              this.products.push(tmpproduct);
            }
          ).catch(
            error => {
              this.products.push(tmpproduct);
              console.log(error);
            }
            );
          // this.products.push(tmpproduct);
        }
      });
    console.log('ionViewDidLoad ProductsPage');
  }


  ionViewWillLeave() {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  navtoAddProductPage() {
    this.navCtrl.push(AddproductPage);
  }
}
