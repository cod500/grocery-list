import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import profileReducer from './profile-reducer';
import listReducer from './list-reducer';




const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    list: listReducer
});

export default rootReducer;