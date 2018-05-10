import { FETCH_EXCHANGE_DATA } from '../constants/exchange';

const initialState = {};

const exchange = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_EXCHANGE_DATA:
            return action.exchange
    }
    return state
}

export default exchange;
