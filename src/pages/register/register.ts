import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";

//@IonicPage()
/*
has a @IonicPage decorator, but it does not have a corresponding "NgModule" at
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(user:User) {
    
      this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(
        result=>{
          console.log(result)
        }
      ).catch(
        error=>{
          console.log(error);
        }
      );
    
  }

}
