import { configureStore } from '@reduxjs/toolkit';
import BaseApi from '../BaseQuery/baseQuery';
import { persistStore, persistReducer} from 'redux-persist';
import { combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import authReducer from '../Slice/Token.Slice'
import userReducer from '../Slice/UserData.Slice'
import { PostApi } from '../ApiSlice/Post.Slice';
// import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    [BaseApi.reducerPath]: BaseApi.reducer,
    [PostApi.reducerPath] : PostApi.reducer,
    auth: authReducer,
  user: userReducer,
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist:['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiiddleware) => getDefaultMiiddleware({
        serializableCheck: false
    }).concat(BaseApi.middleware),
});

export const persistor = persistStore(store)
export default store;