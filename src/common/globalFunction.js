/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class $_SYSTEM {

  userDetail=undefined;

   constructor() {
    console.log('Initializing datas ');
    this.getUserDetail = this.getUserDetail.bind(this);
    this.loadUser = this.loadUser.bind(this);
   }

   async loadUser(key = undefined){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem('loggedUser').then(r=>{
        console.log('Loading User detail : ',r);
          if (r){
             this.userDetail = r;
             resolve( (key) ? this.userDetail[key] : this.userDetail);
          } else {
            console.log('not found any user');
            reject('false');
          }
        }).catch(e=>{
          reject('false');
          console.log('User detail : ',e);
        });
    });
   }

   async getUserDetail(key = undefined){
    return new Promise((resolve,reject)=>{
      if (this.userDetail)
       {resolve( (key) ? this.userDetail[key] : this.userDetail);}
      else
        {this.loadUser().then(r=>{
          resolve(r);
        }).catch(e=>{
          reject(e);
        });}
    });
   }
 }

 export class $_USER{
    static GET(key = undefined){
      console.log('callign...');
      return new Promise((resolve,reject)=>{
        AsyncStorage.getItem('loggedUser').then(r=>{
          if (r){
            r = JSON.parse(r);
            resolve( (key) ? r[key] : r);
          }
          else {
            reject(false);
          }
        }).catch(err=>{
          reject(err);
        });
      });
    }
 }
