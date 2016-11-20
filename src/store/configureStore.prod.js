import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/* Creates the Production Redux Store */
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
