import { ADD_PLACE,SET_PLACES } from "./places-actions";
import Place from '../models/place';

const initialState = {
  allplaces:[]
};

export default (state=initialState,action)=>{

  switch(action.type){
    case SET_PLACES:
      return {
          allplaces:action.places.map(pl=> new Place(
            pl.id.toString(),
            pl.title,
            pl.imageUri,
            pl.address,
            pl.lat,
            pl.lng,
        
            ))
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng

        );
        return {
          allplaces:[...state.allplaces,newPlace] // or state.places.concat(newPlace)
        }
      default:
        return state;
  }

}