import React,{useEffect, useLayoutEffect} from 'react';
import {View,Text,StyleSheet,FlatList,Platform} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import {useSelector,useDispatch} from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as PlacesActions from '../store/places-actions';

//----//-------------------------

function PlacesListScreen({navigation}) {
  const places = useSelector(state=>state.places.allplaces);
  const dispatch = useDispatch();
  //console.log(places.allplaces);

  //-------------------------------------
    useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Mes Places Visitées',
      headerRight:()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item 
          title="Add Place" 
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress ={()=>{navigation.navigate('NewPlace')}}
          />
        </HeaderButtons>
      )
    });
  }, [navigation]);

  //----------------------------
    useEffect(()=>{
      dispatch(PlacesActions.loadPlaces())
    },[dispatch]);
  //----------------------------

  return (
      <FlatList
       data={places}
       keyExtractor={item=>item.id}
       renderItem = {itemData => <PlaceItem
        image={itemData.item.imageUri} 
        title={itemData.item.title}
        address={itemData.item.address}
        onSelect={()=>{
          navigation.navigate('PlaceDetail',
          {
            placeTitle:itemData.item.title,
            placeId:itemData.item.id
          })
        }}
        />}
      />
  );
}



//----------//-------------------

const styles = StyleSheet.create({
  
});


export default PlacesListScreen;