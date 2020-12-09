import React,{useState,useLayoutEffect,useCallback} from 'react';
import {ScrollView,View,Text,Button,TextInput,StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Colors from '../constants/Colors';

import * as placesActions from '../store/places-actions';

import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

//------------//--------------------------

function NewPlaceScreen({navigation,route}) {
  
  const [titleValue,setTitleValue]=useState('');
  const [selectedImage,setSelectedImage]=useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();
  //------------------------------------
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ajouter une place',
    });
  }, [navigation]);

  //----------------------------------------

    const titleChangeHandler = text=>{
        // control validation à ajouter après
        setTitleValue(text);
      }

   //----------------------------------------
   
   const savePlaceHandler=()=>{
      dispatch(placesActions.addPlace(titleValue,selectedImage,selectedLocation));
      navigation.goBack();
   }

   //----------------------------------------
    
   const imageTakenHandler = imagePath=>{
     setSelectedImage(imagePath);
   }
    //----------------------------------------

    const locationPickedHandler = useCallback(location =>{
       // console.log('render position : ',location);
        setSelectedLocation(location);
    },[]);

  return (
    <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Titre</Text>
          <TextInput style={styles.textInput}
            onChangeText={titleChangeHandler}
            value={titleValue}
          />
          <ImagePicker onImageTaken={imageTakenHandler}/>
          <LocationPicker navigation={navigation} route={route} onLocationPicked={locationPickedHandler}/>
          <Button title='Enregistrer ce lieu' color={Colors.primary}
            onPress={savePlaceHandler}
          />
        </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  form:{
    margin:30
  },
  label:{
    fontSize:18,
    marginBottom:15
  },
  textInput:{
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    marginBottom:15,
    paddingVertical:4,
    paddingHorizontal:2
  }
});

export default NewPlaceScreen;