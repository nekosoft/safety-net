import { createStore, combineReducers, compose } from 'redux';
import {isProd}                                             from "../util";
import appReducer                                           from "../store/reducer/app";
import { reducer as formReducer }                           from 'redux-form';
import storage                                              from 'redux-persist/lib/storage';
import {persistReducer, persistStore}                       from "redux-persist";
import { createLogger }                                     from 'redux-logger';
import { createMetaReducer, createMiddleware }              from 'redux-beacon';
import GoogleTagManager                                     from '@redux-beacon/google-tag-manager';
import logger from '@redux-beacon/logger'; // optional

window.rerendered = 0;


const rLogger = createLogger({
    diff: true,
    collapsed: (getState, action, logEntry) => !logEntry.error
});


const appPersistConfig = {
    key: 'app',
    storage,
    blacklist: [ 'redirectUrl', 'loading' ]
};


var reducer = combineReducers({
    app: persistReducer(appPersistConfig, appReducer),
    form: formReducer,
});

let __INIT_STORE__ = {};
if (!isProd) {
    /* Create mock store here if you like...
    __INIT_STORE = {
       ...
    };
    */
}

// reducer = persistReducer(persistConfig, reducer);


/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */


const store = createStore(reducer,
    __INIT_STORE__,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     composeEnhancers(thunkMiddleware),
//     composeEnhancers( applyMiddleware(rLogger, gtmMiddleware) )
//        composeEnhancers( applyMiddleware(gtmMiddleware) )
);


const persistor = persistStore(store);

// persistor.purge();



export { store, persistor };