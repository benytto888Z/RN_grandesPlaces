import React,{useState,useEffect,useLayoutEffect,useCallback} from 'react';
import {Text,StyleSheet,Platform,Alert} from 'react-native';
import MapView , { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import {isEmpty} from '../constants/isEmpty';


//---------//----------------------------------------------------------


function MapScreen({navigation,route}) {
const routeParams = route.params ? route.params : {};

// recupération de la position initiale depuis PlaceDetailScreen

const initialLocation = routeParams.initialLocation ? routeParams.initialLocation : {} ;
const readonly = routeParams.readonly ? routeParams.readonly : null;


const [selectedLocation,setSelectedLocation] = useState(initialLocation);
const [userRegion, setUserRegion] = useState({});

//console.log(initialLocation);

const initRegion = {
  latitude: 48.844678,
  longitude: 2.376856,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
//--------------------------------
  const mapRegion = {
      latitude:  initialLocation.lat,
      longitude: initialLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  };

  // componentDidMount() pour le premier affichage du map
  // si on revient de PlacesListScreen c'est initRegion qui est prise en compte
  // si on revent de PlaceDetailScreen c'est mapRegion qui est pris en compte
  useEffect(()=>{
      setUserRegion(initialLocation.lng ? mapRegion : initRegion);
  },[])

  //--------------------------------

    const selectLocationHandler =(event)=> {

   // si on reveint de PlaceDetailScreen on pourra pas piquer une nouvelle localisation ou
   // un marker on sort de cette methode
    if(readonly){
      return{};
    }

     // si on reveint de PlacesListScreen on pourra  piquer une localisation ou
    // un marker
        setSelectedLocation({
          lat:event.nativeEvent.coordinate.latitude,
          lng:event.nativeEvent.coordinate.longitude
      });

      //console.log('loc : ',selectedLocation);
    
    };

    //componentDidUpdate() si l'utilisateur choisit une localisation ou non
    useEffect(()=>{

      if(isEmpty(selectedLocation)){
         return;
      }else{
          //console.log('loc : ',selectedLocation);
          setUserRegion(
            {
              latitude:selectedLocation.lat,
              longitude: selectedLocation.lng, 
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,});
      }
      
  },[selectedLocation])
 
  
  //--------------------------------

  const savePickedLocationHandler = useCallback(() =>{

    if(!selectedLocation){
      Alert.alert('Aucune sélection','Veuillez choisir un lieu',[
        {text:'Ok'}
      ])
      return;
    }

    navigation.navigate('NewPlace',{pickedLocation:selectedLocation});
       
  },[selectedLocation]);
  //--------------------------------

  useEffect(()=>{
    navigation.setParams({
        saveLocation:savePickedLocationHandler
    })
  },[savePickedLocationHandler])
  
  //--------------------------------

  let markerCoordinates;

  if(selectedLocation){
    markerCoordinates = {
      latitude:selectedLocation.lat ? selectedLocation.lat : 0,
      longitude:selectedLocation.lng ? selectedLocation.lng : 0
    }
  }

  //--------------------------------

  return (
    <MapView 
    provider= {Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
    style={styles.map} 
    region={userRegion}
    onPress={selectLocationHandler}
    >
    {markerCoordinates && (<Marker 
    title='Choisir un emplacement'
    coordinate={markerCoordinates}
    />)}
    </MapView>
  );
}

//----------------------------

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  const saveFn = routeParams.saveLocation ? routeParams.saveLocation : null;
  const readonly = routeParams.readonly;

  if(readonly){
    return{
      headerTitle: 'Carte',
    };
  }

  return {
    headerTitle: 'Carte',
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
      <Text style={styles.headerButtonText}>Enregistrer</Text>
      </TouchableOpacity>
    ),
  }
}
//---------------//-----------------


const styles = StyleSheet.create({
  map:{
    flex:1,
  },
  headerButton:{
    marginHorizontal:20
  },
  headerButtonText:{
    fontSize:16,
    color:Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;