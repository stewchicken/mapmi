This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

ionic generate page house


## it is boilerplate for app which could upload photo and data into firebase ( remote backend for handy)
install ionic and cordova

$ sudo npm install -g ionic cordova
Then, to run it, cd into mytodo and run:

$ ionic serve
build and publish to android or ios

http://ionicframework.com/docs/intro/deploying/

## build and publish to android or ios or debug on real devices
https://github.com/stewchicken/ionic-myplace/README.MD
http://ionicframework.com/docs/intro/deploying/
https://github.com/stewchicken/PicPrint/blob/master/doc.txt


## set up google map js sdk (if you dont want to use angular2 google map native sdk)
https://www.youtube.com/watch?v=0Ue6fNPOdB4 

## geolocation plugin
https://www.techiediaries.com/ionic-geolocation-google-maps-places-api/

## ionic moduleController 

## set up angular2 google maps (if you dont want to use google map js sdk)
https://angular-maps.com/
https://www.youtube.com/watch?v=0Ue6fNPOdB4 

## add real devices 
C:\Users\ywang\AppData\Local\Android\Sdk\platform-tools\adb devices

## questions
ionoic cordova build android (how to set android version for example android 7.0)


## why i need to install cordova and native plugin both
## could i use geolcation if i only install npm install --save @ionic-native/geolocation
Install the Cordova and Ionic Native plugins:
$ ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
$ npm install --save @ionic-native/geolocation