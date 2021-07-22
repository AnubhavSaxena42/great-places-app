import React,{useState} from 'react'
import { View,Button,Text,TextInput,StyleSheet, ScrollView } from 'react-native'
import Colors from '../constants/Colors'
import {useDispatch} from 'react-redux'
import * as placesActions from '../store/PlacesActions' 
import ImagePicker from '../components/ImageSelector'
import LocationPicker from '../components/LocationPicker'
const NewPlaceScreen = props => {
    const [titleValue,setTitleValue] = useState('')
    const [selectedImage,setSelectedImage] = useState()
    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }
    const titleChangeHandler = (text) => {
        setTitleValue(text);
    }
    const dispatch= useDispatch()
    const savePlaceHandler=()=>{
        dispatch(placesActions.addPlace(titleValue,selectedImage))
        props.navigation.goBack();
    }
    return (
        <ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.textinput} onChangeText={titleChangeHandler} value={titleValue}/>
            <ImagePicker onImageTaken={imageTakenHandler}/>
            <LocationPicker/>
            <Button title='Save place' color={Colors.primary} onPress={savePlaceHandler}/>
        </View>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    form:{
        margin:30
    },
    label:{
        fontSize:18,
        marginBottom:15
    },
    textinput:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginBottom:15,
        paddingVertical:4,
        paddingHorizontal:2,
    }
})
NewPlaceScreen.navigationOptions={
    headerTitle:'Add new place'
}

export default NewPlaceScreen