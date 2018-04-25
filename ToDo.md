

Install Ionic

`
npm install -g ionic
`

Start an App

```
ionic start myApp tabs
```

Then, to run it, cd into `myApp` and run on real devices as app
- for ios
```
 ionic cordova platform add ios
 ionic cordova build ios
 ionic cordova run ios
```
- for android
```
 ionic cordova platform add android
 ionic cordova build android
 ionic cordova run android
```

Of couse, to build and run for real devices you need to install SDK, and use usb to connect handy with PC 
- see below example for android

```

ANDROID_HOME=C:\Users\<username>\AppData\Local\Android\sdk
JAVA_HOME=C:\Program Files\Java\jdk1.8.0_152

C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools  adb devices
adb device

```

Run your App on PC as web 
```              
cd myApp
ionic serve
```
add cordova plugin
```
ionic cordova plugin add cordova-plugin-image-picker

ionic cordova plugin add https://github.com/Telerik-Verified-Plugins/ImagePicker.git
```
generate page
```
ionic generate page Login
```
Define rootpage

```
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
```
Define and use Service 

- e.g write ImageProvider whihc does upload image service
- declare it at app.module.ts
```
providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ImageProvider,
    Camera,
    Sim, 
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
```

- use ImageProvider in any other component 

```
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

```

debug on real devices with vscode

```
https://wangyan100.github.io/2018/04/19/debug-ionic-on-real-device-with-vscode/
```

