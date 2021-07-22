import React,{useState} from 'react'
import { View,Text,ActivityIndicator,StyleSheet,Alert,Button } from 'react-native'
import Colors from '../constants/Colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
const LocationPicker = props => {
    const [pickedLocation,setPickedLocation] = useState()
    const [isFetching,setIsFetching]= useState(false)
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION_BACKGROUND,Permissions.LOCATION_BACKGROUND)
        if(result.status!=='granted'){
            Alert.alert('Insufficient Permissions','You need to grant Location permissions to use this app!',[{text:'okay'}])
            return false;
        }
        return true;
    }
   const getLocationHandler= async ()=>{
        const hasPermissions = await verifyPermissions()
        console.log(hasPermissions)
        if(!hasPermissions){
            return
        }
        try{
            console.log('in here')
            setIsFetching(true)
          const location = await Location.getCurrentPositionAsync({timeout:5000});
          console.log(location)
          setPickedLocation({
              lat:location.coords.latitude,
              lng:location.coords.longitude
          })

        } catch(err){
            Alert.alert('Could not fetch','Try again later or pick on map',[{text:'okay'}])
        }
        setIsFetching(false)
   }
    
   return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {isFetching?<ActivityIndicator size="large" color={Colors.primary}/>:<Text>No location chosen yet!</Text>}
            </View>
            <Button title='Get user location' color={Colors.primary} onPress={getLocationHandler}/>
        </View>
    )
}
const styles=StyleSheet.create({
    locationPicker:{
        marginBottom:15,
    },
    mapPreview:{
        marginBottom:10,
        width:'100%',
        height:150,
        borderColor:'#ccc',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    }

})

export default LocationPicker