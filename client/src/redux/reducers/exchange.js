import { FETCH_EXCHANGE_DATA } from '../constants/exchange';
import { FETCH_CLASS } from '../constants/class';
import { LOGOUT_SUCCESS } from '../constants/teacher';

const initialState = {};

// Exchange model has classAVerified and classBVerified booleans
// Check if the current class is verified based on classRole
const classIsVerified = (classRole, exchange) => {
    const classRoleId = `class${classRole}Verified`
    const isVerified = exchange[ `class${classRole}Verified` ];
    return isVerified;
};

const exchange = (state=initialState, { type, exchange }) => {
    switch(type) {
        case FETCH_EXCHANGE_DATA:
        case FETCH_CLASS:
            if (exchange) {
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
