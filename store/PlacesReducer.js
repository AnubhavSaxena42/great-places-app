import { ADD_PLACE, SET_PLACES } from "./PlacesActions";
import Place from '../models/place'
const initialState={
    places:[]
}

export default (state=initialState,action)=>{
    switch (action.type){
        case ADD_PLACE:
            const newPlace = new Place(action.placeData.id.toString(),action.placeData.title,action.placeData.image)
            return {
                places:state.places.concat(newPlace)
            }
        case SET_PLACES:
            console.log('it is called')
            console.log(action.places)
            return {
                places:action.places.map(pl=> new Place(pl.id.toString(),pl.title,pl.imageUri))
            }
        default:
            return state;
    }
}