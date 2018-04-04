import { UPDATE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';

const initialState = {};

const classes = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CLASS:
            return { ...state, list: { ...state.list, ...action._class }, currentClass: action.currentClass}
        case UPDATE_CLASS_SUCCESS:
            const classId = action.updatedClass.id;
            let newState = { ...state }
            newState.list[classId] = { ...action.updatedClass }
            console.log('newState', newState)
            return newState
    }
    return state
}


export default classes;
