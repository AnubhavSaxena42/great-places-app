import React,{useState} from 'react'
import { View,Alert,Button,Text,StyleSheet,Image } from 'react-native'
import Colors from '../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
const ImgPicker = props => {
    const [pickedImage,setPickedImage] = useState()
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA,Permissions.MEDIA_LIBRARY)
        if(result.status!=='granted'){
            Alert.alert('Insufficient Permissions','You need to grant camera permissions to use this app!',[{text:'okay'}])
            return false;
        }
        return true;
    }
    const takeImageHandler = async () => {
        const hasPermission= await verifyPermissions()
        if(hasPermission==='false')
        return;
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        });
        setPickedImage(image.uri)
        props.onImageTaken(image.uri)
        console.log(image);
    }
    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage?<Text>No image picked yet</Text>:
            <Image source={{uri:pickedImage}} style={styles.image}/>}
        </View>
        <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler}/>
    </View>
}

const styles=StyleSheet.create({
    imagePicker:{
        alignItems:'center',
        marginBottom:15,
    },
    imagePreview:{
        width:'100%',
        height:200,
        marginBottom:10,
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

export default ImgPicker