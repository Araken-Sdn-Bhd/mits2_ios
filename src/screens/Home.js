import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import {theme} from '../core/theme';
import GlobalContext from '../GlobalContext';

export default class LoginScreen extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {setUser,startLoading,stopLoading} = this.context;
    const {loadLocalData} = this.context;
    this.props.navigation.addListener('focus', () => {
      loadLocalData();
      this.setState({});
    });
  }

  render() {
    const {navigation} = this.props;
    const {getLocalData} = this.context;
    const allData = getLocalData();
    console.log(allData);
    return (
      <Background>
        <Logo />
        <Header />
        <Text style={{textAlign: 'center'}}>
          {allData.sep.length ? 'SE PROGRESS NOTE DATA FOUND' : ''}
        </Text>
        <Text style={{textAlign: 'center'}}>
          {allData.cps.length ? 'CPS PROGRESS NOTE DATA FOUND' : ''}
        </Text>
        {/* <Text style={{textAlign: 'center'}}>please connect to the network</Text> */}
        <TouchableOpacity
          onPress={() => {
            navigation.push('SeProgressNote');
          }}>
          <View style={styles.container}>
            <View style={styles.item}>
              <Image
                source={require('../data/assets/images/data.png')}
                resizeMode="contain"
                style={styles.background}
              />
              <Text style={styles.h2}>SE PROGRESS NOTE</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push('CpsProgressNote');
          }}>
          <View style={styles.container}>
            <View style={styles.item}>
              <Image
                source={require('../data/assets/images/data.png')}
                resizeMode="contain"
                style={styles.background}
              />
              <Text style={styles.h2}>CPS PROGRESS NOTE</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push('WorkAnalysisForm');
          }}>
          <View style={styles.container}>
            <View style={styles.item}>
              <Image
                source={require('../data/assets/images/data.png')}
                resizeMode="contain"
                style={styles.background}
              />
              <Text style={styles.h2}>WORK ANALYSIS FORM</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: 60,
    width: 60,
  },
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
  container: {
    flexWrap: 'wrap',
    backgroundColor: theme.colors.primary,
    marginVertical: 7,
    borderRadius: 18,
  },
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  h2: {
    width: '90%',
    fontSize: 20,
    color: theme.colors.white,
    marginLeft: 10,
  },
});
