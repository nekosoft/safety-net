import {
    DO_REDIRECT,
    EMPTY_STORE
} from '../action/app';

const initialState = {
    council: -1
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {


        case DO_REDIRECT:
            state = Object.assign({}, state, { redirectUrl: action.payload });
            break;

        case EMPTY_STORE:
            return initialState;

        default:
            break;
    }

    return state;

};

export default appReducer;
