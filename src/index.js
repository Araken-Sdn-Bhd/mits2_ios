import {AppRegistry} from 'react-native';
// import App from './src/App';
// import App from './src/testReact/App';
import {name as appName} from './app.json';
import App from './src/app';

AppRegistry.registerComponent(appName, () => App);
