import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import snackBarReducer from "./snackBarReducer";
import globalReducer from './globalReducer';

import authReducer from './authReducer';
import contentHistoryReducer from "./contentHistoryReducer";

import adsReducer from './template/ads';
import blogReducer from './template/blog';
import youtubeReducer from './template/youtube';
import socialReducer from './template/social_media';
import amazonReducer from './template/amazon';

const rootReducer = combineReducers({
    globalState: globalReducer,
    snackBarState: snackBarReducer,
    
    authState: authReducer,
    contentHistoryState: contentHistoryReducer,

    blogState: blogReducer,
    adsState: adsReducer,
    youtubeState: youtubeReducer,
    socialState: socialReducer,
    amazonState: amazonReducer,
})


export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);