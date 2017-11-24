import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { RegisterPage } from "../register/register";
import { MenuPage } from "../menu/menu";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  //loggedin = false;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.onAuthCallback = this.onAuthCallback.bind(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onAuthCallback(user) {
    if (!user) {
      console.log("user is not logged in");
      //this.logOut();
      // this.navCtrl.popToRoot()
    } else {
      //this.loggedin = true;
      this.user = {} as User;
      this.navCtrl.push(MenuPage);
      console.log("user is logged in");
      return;
    }
  }

  ionViewWillEnter() {
    // When the callback is triggered, it will have the 
    // proper value for 'this'.
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
  }


  async login(user: User) {

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).
      then((session) => {
        let firebaseuser = session.currentUser;
        console.log(firebaseuser);
        console.log(this.afAuth.auth.currentUser);
        this.user = {} as User;
        this.navCtrl.push(MenuPage);

      }).catch(error => {
        user.email = "email  maybe wrong!"
        user.password = "password maybe not correct!"
      });
  }



  register() {
    this.navCtrl.push(RegisterPage);
    // this.navCtrl
  }
}
