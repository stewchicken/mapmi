import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(public http: Http) {
    console.log(' ImageProvider Provider');
  }

  uploadImage(image: string, namespace: string, imageName: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${namespace}/${imageName}.jpg`);
    return imageRef.putString(image, 'data_url');
  }

  getImage(namespace: string, imageName: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${namespace}/${imageName}.jpg`);
    return imageRef.getDownloadURL();
  }

}
