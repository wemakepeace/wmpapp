import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { FETCH_CLASS } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = {};

const exchange = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_EXCHANGE_DATA:
        case FETCH_CLASS:
            if (action.exchange) {
                return { ...action.exchange, classRole: action.classRole };
            }
            return {};
        case LOGOUT_SUCCESS:
            return {};
    }
    return state;
}

export default exchange;
