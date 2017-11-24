import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';

import { AngularFireAuthModule } from "angularfire2/auth";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { MenuPage } from "../pages/menu/menu";
import { ProductsPage } from "../pages/products/products";
import { ShoppingPage } from "../pages/shopping/shopping";
import { AddproductPage } from "../pages/addproduct/addproduct";
import { ImageProvider } from '../providers/image/image';
import { Camera } from '@ionic-native/camera';
import { HousePage } from "../pages/house/house";
import { AddhousePage } from "../pages/addhouse/addhouse";
import { ShowmapPage } from "../pages/showmap/showmap";
import { AddaccidentPage } from '../pages/addaccident/addaccident';
import { AccidentPage } from '../pages/accident/accident';
import { AccidentdetailsPage } from '../pages/accidentdetails/accidentdetails';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    ProductsPage,
    ShoppingPage,
    AddproductPage,
    HousePage,
    AddhousePage,
    ShowmapPage,
    AddaccidentPage,
    AccidentPage,
    AccidentdetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAURS-J1xRlF9wEuQ6XjYSqqJVDzvUOOuc'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    ProductsPage,
    ShoppingPage,
    AddproductPage,
    HousePage,
    AddhousePage,
    ShowmapPage,
    AddaccidentPage,
    AccidentPage,
    AccidentdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ImageProvider,
    Camera,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
