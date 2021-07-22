import React from 'react'
import PlacesNavigator from './navigation/PlacesNavigator';
import {createStore,applyMiddleware,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import placesReducer from './store/PlacesReducer'
import {init} from './helpers/db.js'
init().then(()=>{console.log('initialised database')}).catch((err)=>{console.log(err)
  console.log('failed')
});
const rootReducer=combineReducers({
  places:placesReducer
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk))
export default function App(){

  
  return <Provider store={store}><PlacesNavigator/></Provider>
}
