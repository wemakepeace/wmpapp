import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import classReducer from './reducers/class';
import authReducer from './reducers/auth';
import feedbackReducer from './reducers/feedback';

const combinedReducers = combineReducers({
    session: classReducer,
    auth: authReducer,
    feedback: feedbackReducer
});

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;

if (reduxDevtools) {
    store = createStore(combinedReducers, reduxDevtools(applyMiddleware(thunk)));
} else {
    store = createStore(combinedReducers, applyMiddleware(thunk));
}

export default store;
