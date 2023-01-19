/* eslint-disable prettier/prettier */
import { Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import Keyguard from 'react-native-keyguard';
import TouchID from 'react-native-touch-id';

export default  class  BasicFunctions {
  constructor() {}


  async checkAuth() {
    debugger;
    return new Promise((resolve, reject) => {
      debugger;
      if (Platform.OS == 'ios'){
        try {
          TouchID.authenticate('Authenication', {
            passcodeFallback:true,
            
          })
          .then((success: any) => {
            console.log(success);
            resolve(true);
          })
          .catch((error: { [x: string]: string; }) => {
            console.log(error);
            if (error.name == 'LAErrorPasscodeNotSet')
              {resolve(true);}
            else
              {reject(false);}
          });
        } catch (error) {
          resolve(true);
        }
      } else {
        Keyguard
        .unlock('LetEl', 'Authentication')
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
      }
      // ReactNativeBiometrics.isSensorAvailable()
      //   .then(r => {
      //     console.log(r);
      //     if (r.available == true) {
      //       ReactNativeBiometrics.simplePrompt({
      //         promptMessage: 'LetEl authentication',
      //       })
      //         .then(resultObject => {
      //           if (resultObject.success) {
      //             resolve('Authorized');
      //           } else {
      //             reject('Authorized failed');
      //           }
      //         })
      //         .catch(() => {
      //           reject('biometrics failed');
      //         });
      //     } else {
      //       resolve('Fingerprint is not detected');
      //     }
      //   })
      //   .catch(r => {
      //     reject('Fingerprint  availability check failed');
      //   });
    });
  }
}
