import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

const PlacesDetailScreen = props => {
    return (
        <View>
            <Text>PlacesDetailScreen</Text>
        </View>
    )
}
const styles=StyleSheet.create({

})
PlacesDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam('placeTitle')
    }
}

export default PlacesDetailScreen