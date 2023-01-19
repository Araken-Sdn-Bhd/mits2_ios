/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator,View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Http from './common/http';
import NetInfo from '@react-native-community/netinfo';

const GlobalContext = React.createContext({});
class GlobalProvider extends Component {
  SEP=[];
  CPS=[];
  WA=[];
  timerCounter = undefined;
  isConnected=false;
  constructor(props){
    super(props);
    Ionicons.loadFont();
    this.state = {
      user: undefined,
      currentLng:'EN',
      loadingView:false,
      isConnected:false,
    };

    // fetchIntercept.register({
    //   request: (url, config)=>{
    //     if (this.state.user){
    //       config.headers.Authorization = `Bearer ${this.state.user.accessToken}`;
    //       config.headers.culture = this.state.currentLng.toLowerCase();
    //     }
    //     console.info('#### Config data : ',config);
    //     return [url, config];
    //   },
    // });
    this.submitWorkData = this.submitWorkData.bind(this);
    this.submitSEPNData = this.submitSEPNData.bind(this);
    this.submitCPSData = this.submitCPSData.bind(this);

    this.getLocalData = this.getLocalData.bind(this);
    this.loadLocalData = this.loadLocalData.bind(this);
  }

  async submitSEPNData(data,i = null){
    console.log('>> ',data);
    return new Promise((resolve,reject)=>{
      if (this.isConnected){
        Http.POST('se-progress-note/add',data).then(r=>{
          console.log(r);
          if (i && i >= 0){
            this.SEP.splice(i,1);
            AsyncStorage.setItem('SEPDATA', JSON.stringify(this.SEP));
            this.setState({});
          }
        if (r.code == 200){
            Http._toast('Form has been saved successfully');
            console.log('deleting  : ',i);
            resolve({isOnline:true,status:true});
          } else {
            Http._toast(JSON.stringify(r.message));
            resolve({isOnline:true,status:false});
          }
        }).catch(e=>{
          console.log(e);
          Http._toast('Form submission failed');
          resolve({isOnline:true,status:false});
        });
      } else {
        this.SEP.push(data);
        AsyncStorage.setItem('SEPDATA', JSON.stringify(this.SEP));
        Http._toast('Form has been saved locally, and will be uploaded when connected to internet');
        resolve({isOnline:false,status:true});
      }
    });
  }

  async submitCPSData(data,i = null){
    console.log('>> ',data);
    return new Promise((resolve,reject)=>{
    if (this.isConnected){
      // http://122.176.47.222:85/mintari2/public/index.php/api/cps-progress-note/add
      Http.POST('cps-progress-note/add',data).then(r=>{
        console.log(r);
        if (i && i >= 0){
          this.CPS.splice(i,1);
          AsyncStorage.setItem('CPSDATA', JSON.stringify(this.CPS));
          this.setState({});
        }
      if (r.code == 200){
          Http._toast('Form has been saved successfully');
          console.log('deleting  : ',i);
          resolve({isOnline:true,status:true});
        } else {
          Http._toast(JSON.stringify(r.message));
          resolve({isOnline:true,status:false});
        }
      }).catch(e=>{
        console.log(e);
        Http._toast('Form submission failed');
        resolve({isOnline:true,status:false});
      });
    } else {
      this.CPS.push(data);
      AsyncStorage.setItem('CPSDATA', JSON.stringify(this.CPS));
      Http._toast('Form has been saved locally, and will be uploaded when connected to internet');
      resolve({isOnline:false,status:true});
    }
  });
  }

  async submitWorkData(data,i = null){
    console.log('>> ',data);
    return new Promise((resolve,reject)=>{
    if (this.isConnected){
      // http://122.176.47.222:85/mintari2/public/index.php/api/cps-progress-note/add
      Http.POST('work-analysis/add',data).then(r=>{
        console.log(r);
        if (i && i >= 0){
          this.WA.splice(i,1);
          AsyncStorage.setItem('WADATA', JSON.stringify(this.WA));
          this.setState({});
        }
      if (r.code == 200){
          Http._toast('Form has been saved successfully');
          console.log('deleting  : ',i);
          resolve({isOnline:true,status:true});
        } else {
          Http._toast(JSON.stringify(r.message));
          resolve({isOnline:true,status:true});
        }
      }).catch(e=>{
        console.log(e);
        Http._toast('Form submission failed');
        resolve({isOnline:true,status:true});
      });
    } else {
      this.WA.push(data);
      AsyncStorage.setItem('WADATA', JSON.stringify(this.WA));
      Http._toast('Form has been saved locally, and will be uploaded when connected to internet');
      resolve({isOnline:true,status:true});
    }
  });
  }

  loadLocalData(){
    console.log('Loading local data');
    // AsyncStorage.setItem('SEPDATA',"");
    AsyncStorage.getItem('SEPDATA').then(rr=>{
      if (rr){
        this.SEP = JSON.parse(rr);
        if (this.SEP.length > 0 && this.isConnected){
          this.SEP.forEach((dd,i)=>{
            setTimeout(() => {
              Http.POST('se-progress-note/add',dd).then(r=>{
                console.log(r);
                if (r.code == 200){
                  Http._toast('Form has been saved successfully');
                  this.SEP.splice(i,1);
                  AsyncStorage.setItem('SEPDATA', JSON.stringify(this.SEP));
                  this.setState({});
                } else {
                  Http._toast(JSON.stringify(r.message));
                }
              }).catch(e=>{
                console.log(e);
                Http._toast('Form submission failed');
              });
            }, 1000 * i + 200);
          });
        }
      } else {
        this.SEP = [];
      }
    });
    AsyncStorage.getItem('CPSDATA').then(rr=>{
      if (rr){
        this.CPS = JSON.parse(rr);
        if (this.CPS.length > 0 && this.isConnected){
          this.CPS.forEach((dd,i)=>{
            setTimeout(() => {
              Http.POST('cps-progress-note/add',dd).then(r=>{
                console.log(r);
                if (r.code == 200){
                  Http._toast('Form has been saved successfully');
                  this.CPS.splice(i,1);
                  AsyncStorage.setItem('CPSDATA', JSON.stringify(this.CPS));
                  this.setState({});
                } else {
                  Http._toast(JSON.stringify(r.message));
                }
              }).catch(e=>{
                console.log(e);
                Http._toast('Form submission failed');
              });
            }, 1000 * i + 200);
          });
        }
      } else {
        this.CPS = [];
      }
    });
    AsyncStorage.getItem('WADATA').then(rr=>{
      if (rr){
        this.WA = JSON.parse(rr);
        if (this.WA.length > 0 && this.isConnected){
          this.WA.forEach((dd,i)=>{
            setTimeout(() => {
              Http.POST('work-analysis/add',dd).then(r=>{
                console.log(r);
                if (r.code == 200){
                  Http._toast('Form has been saved successfully');
                  this.WA.splice(i,1);
                  AsyncStorage.setItem('WADATA', JSON.stringify(this.WA));
                  this.setState({});
                } else {
                  Http._toast(JSON.stringify(r.message));
                }
              }).catch(e=>{
                console.log(e);
                Http._toast('Form submission failed');
              });
            }, 1000 * i + 200);
          });
        }
      } else {
        this.WA = [];
      }
    });
  }

  getLocalData(){
    return {sep:this.SEP,cps:this.CPS,wa:this.WA};
  }
  startLoading=()=>{
    console.log("Loaing started...");
    this.setState({loadingView:true});
  }

  stopLoading=()=>{
    this.setState({loadingView:false});
  }

  componentDidMount(): void {
    this.loadLocalData();
    NetInfo.addEventListener(state => {
      // console.log(state);
      // console.log('Is connected?', state.isConnected);
      this.isConnected = state.isConnected;
      // Http._toast(state.isConnected? "Network established":"Network Disconnected");
    });
    NetInfo.fetch().then(state => {
      // console.log(state);
      // console.log('Is connected?', state.isConnected);
      // this.setState({
      //   isConnected:state.isConnected,
      // });
      this.isConnected = state.isConnected;
      // if (this.isConnected){
      //   if (this.SEP.length > 0){
      //     this.SEP.forEach((dd,i)=>{
      //       this.submitSEPNData(dd,i);
      //     });
      //   }
      // }
      // Http._toast(state.isConnected? "Network established":"Network Disconnected");
    });
  }

  componentWillUnmount() {
    // EventRegister.removeEventListener(this.timerCounter)
  }

  translate = txt => {
    // return langs[txt][this.state.currentLng];
  }

  setUser = val => {
    this.setState({
      ...this.state,
      user:val,
    });
    AsyncStorage.setItem('loggedUser',JSON.stringify(val));
  }

  setLng = val => {
    // this.setState({currentLng:val});
    // AsyncStorage.setItem('currentLng',val);
  }

  render() {
    const {children} = this.props;
    const {user} = this.state;
    const {currentLng} = this.state;
    const {setUser} = this;
    const {setLng} = this;
    const {translate} = this;
    const {startLoading} = this;
    const {stopLoading} = this;

    const {submitSEPNData} = this;
    const {submitCPSData} = this;
    const {submitWorkData} = this;

    const {loadLocalData} = this;
    const {getLocalData} = this;
    const {isConnected} = this;

    return (
      // <Text>okay</Text>
      <GlobalContext.Provider
        value={{
          user,
          currentLng,
          setUser,
          setLng,
          translate,
          startLoading,
          stopLoading,
          submitSEPNData,
          loadLocalData,
          getLocalData,
          isConnected,
          submitCPSData,
          submitWorkData
        }}>

        {children}

        {
        (this.state.loadingView) ?
        <View style={{
            position: 'absolute',
            top:0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex:99999999999999,
            width:'100%',
            backgroundColor:'#00000096',
            paddingTop:'100%',
        }}>
          <ActivityIndicator
              style={{}}
              color={"white"}
              size="large"
            />
        </View> : null
        }
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContext;
export {GlobalProvider};
