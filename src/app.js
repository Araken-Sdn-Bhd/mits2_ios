/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React, {Component, useState, useEffect} from 'react';
import Login from './screens/Login';
import Home from './screens/Home';
import SeProgressNote from './screens/SeProgressNote';
import SplashScreen from './SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {GlobalProvider} from './GlobalContext';
import CpsProgressNote from './screens/CpsProgressNote';
import WorkAnalysisForm from './screens/WorkAnalysisForm';

const Stack = createStackNavigator();

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  useEffect(() => {
    // setTimeout(() => {
      console.log('App started now ....');
      setShowSplashScreen(false);
    // }, 2000);
  }, []);

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {showSplashScreen ? (
            <Stack.Screen
              options={navProps => ({
                headerShown: false,
              })}
              name={'SplashScreen'}
              component={SplashScreen}
            />
          ) : null}

          <Stack.Screen
            options={navProps => ({
              headerShown: false,
            })}
            name={'Login'}
            component={Login}
          />

          <Stack.Screen
            options={navProps => ({
              headerShown: false,
            })}
            name={'Home'}
            component={Home}
          />
          <Stack.Screen
            options={navProps => ({
              headerShown: false,
            })}
            name={'SeProgressNote'}
            component={SeProgressNote}
          />
          <Stack.Screen
            options={navProps => ({
              headerShown: false,
            })}
            name={'CpsProgressNote'}
            component={CpsProgressNote}
          />

          <Stack.Screen
            options={navProps => ({
              headerShown: false,
            })}
            name={'WorkAnalysisForm'}
            component={WorkAnalysisForm}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
export default App;
