import * as actionTypes from './actions';

const initialState = {
    categories: [],
    range: '',
    speed: '',
    title: '',
    url: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SONG:
            return {
                ...state,
                categories: action.categories,
                range: action.range,
                speed: action.speed,
                title: action.title,
                url: action.url
            };
        case actionTypes.REMOVE_SONG:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;
