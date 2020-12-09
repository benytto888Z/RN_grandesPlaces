import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import {init} from './helpers/db';

init().then(()=>{
console.log('Initialize database');
}).catch(err=>{
  console.log('Database initialize failed');
  console.log(err);
})


const rootReducer = combineReducers({
places: placesReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

console.disableYellowBox = true;
export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator/>
      <StatusBar style="auto" />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
