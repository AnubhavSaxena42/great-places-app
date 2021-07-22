import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View,Text,StyleSheet,FlatList, Platform } from 'react-native'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/PlacesActions'
const PlacesListScreen = props => {
    const places = useSelector(state=>state.places.places)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(placesActions.loadPlaces());
    },[dispatch])
    return (
        <FlatList data={places} keyExtractor={item=>item.id} renderItem={itemData=><PlaceItem image={itemData.item.imageuri} title={itemData.item.title} address={null} onSelect={()=>{props.navigation.navigate('PlaceDetail',{placeTitle:itemData.item.title,placeId:itemData.item.id})}}/>}/>
    )
}
const styles=StyleSheet.create({

})
PlacesListScreen.navigationOptions=(navData)=>{
    return{
        headerTitle:'All Places',
        headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='add place'
                iconName={Platform.OS==='android'?'md-add':'ios-add'}
                onPress={
                    ()=>{
                        navData.navigation.navigate('NewPlace');
                    }
                }
            />
        </HeaderButtons>

    }
}
export default PlacesListScreen