import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { FETCH_CLASS } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = {};

// we need to set exchanging class on reducer

const getExchangeClass = (currentClassRole, exchange) => {
    const exchangeClassRole = currentClassRole === 'A' ? 'B' : 'A';
    const exchangeClass = exchange[ `class${exchangeClassRole}` ];
    return exchangeClass;
}
// Exchange model has classAVerified and classBVerified booleans
// Check if the current class is verified
const classIsVerified = (classRole, exchange) => {
    const classRoleId = `class${classRole}Verified`
    const isVerified = exchange[ `class${classRole}Verified` ];
    return isVerified;
};


const exchange = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_EXCHANGE_DATA:
        case FETCH_CLASS:
            if (action.exchange) {
                console.log('action.exchange', action.exchange)
                const { exchange } = action;
                return {
                    ...exchange,
                    classIsVerified: classIsVerified(exchange.classRole, exchange)
                };
            }
            return {};
        case LOGOUT_SUCCESS:
            return {};
    }
    return state;
}


export default exchange;
