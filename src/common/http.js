/* eslint-disable prettier/prettier */
import {Alert, Platform, ToastAndroid} from 'react-native';

export default class Http {
  // static apiUrl = 'http://122.176.47.222:85/mintari2/public/index.php/api/';
  // static apiUrl = 'http://192.168.1.130.com:8000/api/'
  // static apiUrl = 'http://araken.asuscomm.com:8000/api/'
  static apiUrl = "https://mentari.moh.gov.my/point/api/"

  static isProduction=true;
  static loading=undefined;

  constructor() {}

  static async POST(url, data = {}) {
    debugger;
    return new Promise((resolve, reject) => {
      // let formdata = new FormData();
      // Object.keys(data).forEach(ele=>{
      //   formdata.append(ele, data[ele]); http://araken.asuscomm.com:8001/api/
      // });
      // 'culture':this.selectedLng.toLowerCase(),
      // 'Authorization':(this.userDetail)? "bearer "+this.userDetail['accessToken']:'',

      console.info(this.apiUrl + url);
      console.info('POSTING DATA : ',data);
      fetch(this.apiUrl + url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'bearer 35e87459-c7ff-4f3e-876c-9d6eceaf8d45',
          'culture':'en',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          resolve(response);
        }).catch(err => {
          // debugger;
          // console.log(err);
          reject(err);
        });
    });
  }

  static async GET(url) {
    debugger;
    return new Promise((resolve, reject) => {
      console.log(this.apiUrl + url);
      fetch(this.apiUrl + url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'bearer 35e87459-c7ff-4f3e-876c-9d6eceaf8d45',
          'culture':'en',
        },
      })
      .then(response => response.json())
      .then(response => {
          resolve(response);
        }).catch(err => {
          // debugger;
          reject(err);
        });
    });
  }


  static _alert(data) {
    Alert.alert(
      'Mentari',
      JSON.stringify(data),
    );
  }

  static _prompt(msg){
    return new Promise((resolve,reject)=>{
      Alert.alert(
        'Mentari',
        msg,
        [
          {
            text: 'Cancel',
            onPress: () =>resolve(false)
            ,
            style: 'cancel',
          },
          { text: 'OK', onPress: () =>
            resolve(true),
           },
        ]
      );
    });

    // Alert.prompt(
    //   "LetEl",
    //   "",
    // )
    // title: string,
    // message?: string,
    // callbackOrButtons?: ((text: string) => void) | AlertButton[],
    // type?: AlertType,
    // defaultValue?: string,
    // keyboardType?: string,
  }

  static _toast(txt){
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        txt,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else {
      Alert.alert('Mentari',txt);
      // AlertIOS.alert(txt);
    }
  }

  static startLoading(){

  }

  static stopLoading(){

  }

  static updateProfile(data){

  }
}

