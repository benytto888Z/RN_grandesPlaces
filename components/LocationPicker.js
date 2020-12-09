import React,{useState,useEffect} from 'react';
import {View,Button,Text,ActivityIndicator,Alert,StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreviews';

import Colors from '../constants/Colors';

//-------------//------------------------
const LocationPicker = ({navigation,route,onLocationPicked}) =>{
  const [isFetching,setIsFetching] = useState(false);
  const [pickedLocation,setPickedLocation]=useState();

  // on recupère les coordonnées picker sur le MapScreen à traver la route renvoyée
  const mapPickedLocation = route.params?.pickedLocation;
  //console.log('params',route.params);

  //const {onLocationPicked} = props;

  useEffect(()=>{
    if(mapPickedLocation){
      console.log("coordonnées renvoyées de la part de mapscreen");
      setPickedLocation(mapPickedLocation);
      //les coordonnées piquées sont renvoyées par le props de LocationPicker
      onLocationPicked(mapPickedLocation);

      
    }
  },[mapPickedLocation,onLocationPicked])

    const verifyPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.LOCATION); // if access to gallery Permissions.CAMERA_ROLL
    
    if (result.status !== 'granted') {
      Alert.alert('Pas assez de droit','Vous devez autoriser la localisation',
      [{text:'Ok'}]
      );
      return false;
    }
    return true;

  }

  //-----------------------------------
  const getLocationHandler = async () =>{
     const hasPermission = await verifyPermissions();
     if(!hasPermission){
       return;
     }
     try{
       setIsFetching(true);
       // geolocalisation
       const location = await Location.getCurrentPositionAsync({timeout:5000});
       //console.log(location);

       //valeur à renvoyer pour le mapPreview pour affichage de  l'image static de la carte
       setPickedLocation({
         lat:location.coords.latitude,
         lng:location.coords.longitude
       });
       console.log("coordonnées renvoyées de la part de la géolocalisation");

       // valeur renvoyer à NewPlaceScreen pour enregistrement en BD
       onLocationPicked({
        lat:location.coords.latitude,
        lng:location.coords.longitude
       })
     }catch(err){
       Alert.alert("Impossible d'avoir votre position",
       "Veiller réessayer ou choisir manuellement votre position!",
       [{text:'Ok'}]
       );
     }
       setIsFetching(false);
  };

  //--------------------------------------

  const pickOnMapHandler = ()=>{
    navigation.navigate('Map');
  }

 return (
 
      <View style={styles.LocationPicker}>
        <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
          {isFetching ? <ActivityIndicator size="large" color={Colors.primary}/> : (<Text>Aucune localisation choisie</Text>)}
        </MapPreview>
        <View style={styles.actions}>
                <Button title="Position actuelle" color={Colors.primary}
                onPress={getLocationHandler}
                />
                <Button title="Choisir sur carte" color={Colors.primary}
                onPress={pickOnMapHandler}
                />
        </View>

      </View>
 );
}

//------------//----------------------

const styles = StyleSheet.create({
  LocationPicker:{
    marginBottom:15
  },
  mapPreview:{
    marginBottom:10,
    width:'100%',
    height:150,
    borderColor:'#ccc',
    borderWidth:1,
  },
  actions:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  }
});

export default LocationPicker;