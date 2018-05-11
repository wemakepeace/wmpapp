import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { FETCH_CLASS } from '../constants/class';
const initialState = {};

const exchange = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_EXCHANGE_DATA:
        case FETCH_CLASS:
            if (action.exchange) {
                return action.exchange
            }
            return {}

    }
    return state
}

export default exchange;
