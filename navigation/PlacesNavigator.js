import React from "react";
import {Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen,{screenOptions as DetailScreenOptions} from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen,{screenOptions as mapScreenOptions} from '../screens/MapScreen';

import Colors from '../constants/Colors';

import { NavigationContainer } from '@react-navigation/native';

const PlacesNavigatorStack = createStackNavigator();


const PlacesNavigator = ()=>{
  return(
    <NavigationContainer>
      <PlacesNavigatorStack.Navigator initialRouteName="Places" screenOptions={{

        headerStyle:{
            backgroundColor:Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor:Platform.OS === 'android' ? 'white' : Colors.primary ,
  
    }}>
        <PlacesNavigatorStack.Screen name="Places" component={PlacesListScreen} />
        <PlacesNavigatorStack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={DetailScreenOptions}/>
        <PlacesNavigatorStack.Screen name="NewPlace" component={NewPlaceScreen} />
        <PlacesNavigatorStack.Screen name="Map" component={MapScreen} options={mapScreenOptions} />
      </PlacesNavigatorStack.Navigator>
    </NavigationContainer>
  )
}


export default PlacesNavigator;

















