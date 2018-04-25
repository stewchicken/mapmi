C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools  adb devices
adb device


ANDROID_HOME=C:\Users\<username>\AppData\Local\Android\sdk
JAVA_HOME=C:\Program Files\Java\jdk1.8.0_152

Install Ionic

`
npm install -g ionic
`

Start an App

```
ionic start myApp tabs
```

Then, to run it, cd into `myApp` and run on real devices as app

```
$ ionic cordova platform add ios
$ ionic cordova run ios
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

`
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
` 