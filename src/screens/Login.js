/* eslint-disable no-lone-blocks */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet,Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import Http from '../common/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../GlobalContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends React.Component {
  static contextType = GlobalContext;

  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      loading: false,
    };
    // this.onLoginPressed = this.onLoginPressed.bind(this);
    // this.nextPage=this.nextPage.bind(this);
  }

  componentDidMount(){
    const {setUser,startLoading,stopLoading} = this.context;
    AsyncStorage.getItem('loggedUser').then(r=>{
      if(r){
        const {navigation} = this.props;
        setUser(JSON.parse(r));
        console.log(r);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }else{
      }
    }).catch(e=>{
      console.log(e);
    });
  }

  nextPage(){
    const {setUser,startLoading,stopLoading} = this.context;
    startLoading();
    AsyncStorage.setItem('loggedUser', JSON.stringify(this.sessionData));
    const {navigation} = this.props;
    stopLoading();
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }

  onLoginPressed(){
  console.log("logging in...");
  debugger;
  const {navigation} = this.props;
  const {setUser,startLoading,stopLoading} = this.context;
  startLoading();
    Http.POST('auth/login',{
      'email':this.state.email,
      'password':this.state.password,
    }).then(res=>{
      console.log("user : ",res);
      stopLoading();
      if(res['code']==200){
        AsyncStorage.setItem('loggedUser', JSON.stringify(res));
        setUser(res);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }else{
        Http._toast("Please enter valid login detail");
      }
    }).catch(e=>{
      stopLoading();
      console.log(e);
      Http._toast("Failed to log in");
      // stopLoading();
    });
  }

  render() {
    return (
      <Background>
        <Logo />
        <Header>Login</Header>
        <Text style={styles.h1}>
          Hey, enter your account details to get login to your account!
        </Text>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={this.state.email.value}
          onChangeText={text => this.setState({email:text})}
          // error={!this.state.email.value}
          // errorText="Please enter valid email address"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={this.state.password.value}
          onChangeText={text => this.setState({password:text})}
          // error={!this.state.password.value}
          // errorText="Please enter password"
          secureTextEntry
        />

        <TouchableOpacity onPress={()=>{
          this.onLoginPressed();
        }} style={{padding:15,width:Dimensions.get('window').width-80,backgroundColor:'#4343a3',borderRadius:8,alignContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>Login</Text>
        </TouchableOpacity>

        {/* 
        <Button mode="contained" onPress={this.onLoginPressed}>
          Login
        </Button> 
        */}

      </Background>
    )
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  h1: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
