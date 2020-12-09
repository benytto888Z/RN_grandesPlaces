import * as FileSystem from 'expo-file-system';
import {insertPlace,fetchPlaces} from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

//-----------//------------------------------

export const addPlace = (title,image,location)=>{
  const apiKey = ENV().googleApiKey;

  return async dispatch => {
     
    // conversion lat et lng en code de geolocalisation
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`);

    if(!response.ok){
        throw new Error("Quelque chose n'a pas marché");
    }

    const resData = await response.json();
    if(!resData.results){
      throw new Error("Quelque chose n'a pas marché");
    }
    const address = resData.results[0].formatted_address;

    const filename = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + filename;

    try{
         await  FileSystem.moveAsync({
          from: image,
          to: newPath
      });
      const dbResult = await insertPlace(title,newPath,address,location.lat,location.lng);
       console.log(dbResult);
      dispatch( {
        type: ADD_PLACE,
        placeData:{id:dbResult.insertId,title:title,image:newPath,address:address,coords:{
          lat:location.lat,
          lng:location.lng
        }}
      })
      
    }catch(err){
      console.log(err);
      throw err;
    }
  };
}

//------------//----------------

export const loadPlaces = ()=>{
  return async dispatch => {
    try{
      const dbResult = await fetchPlaces();
      //console.log(dbResult.rows._array);
      dispatch({
      type:SET_PLACES,
      places:dbResult.rows._array
    })

    }catch(err){
        throw err;
    }

  }
}
