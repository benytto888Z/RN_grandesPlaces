import React,{useState} from 'react';
import {View,Button,Image,Text,StyleSheet,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';

import * as Permissions from 'expo-permissions';

//-------//---------------------------------

const ImgPicker = props => {

  const [pickedImage,setPickedImage] = useState();
  //---------------------------
  const verifyPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL); // if access to gallery Permissions.CAMERA_ROLL
    
    if (result.status !== 'granted') {
      Alert.alert('Pas assez de droit','Vous devez autorisé l\'accès à la camera',
      [{text:'Ok'}]
      );
      return false;
    }
    return true;

  }
  //----------------------------

  const takeImagehandler = async()=>{
    const hasPermission = await verifyPermissions();

    if(!hasPermission){
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing:true,
      aspect : [16,9],
      quality:0.5
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  }

  //--------------------------

  return <View style={styles.ImagePicker}>
            <View style={styles.imagePreview}>
                  {!pickedImage ? <Text>Aucune Image choisie</Text> :
                  <Image style={styles.image}
                    source={{uri : pickedImage}}
                  />}
            </View>
            <View  style={{marginVertical:15}}>
                <Button title="Prendre une photo du lieu" color={Colors.secondary}
                onPress ={takeImagehandler}
                />
            </View>

        </View>
}

//--------//--------


const styles = StyleSheet.create({
  imagePicker:{
      alignItems:'center',
      marginBottom:15
  },
  imagePreview:{
    width:'100%',
    height:200,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#ccc',
    borderWidth:1
  },
  image:{
    width:'100%',
    height:'100%'
  }
})

export default ImgPicker;