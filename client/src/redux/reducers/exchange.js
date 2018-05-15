import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { FETCH_CLASS } from '../constants/class';
const initialState = {};

const exchange = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_EXCHANGE_DATA:
        case FETCH_CLASS:
        console.log('action.exchange', action.exchange)
            if (action.exchange) {
                console.log('action.classRole', action.classRole)
                return { ...action.exchange, classRole: action.classRole }
            }
            return {}

    }
    return state
}

export default exchange;
