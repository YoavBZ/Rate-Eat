import initialState from '../../initialState';
import DragAndDropConstants from './constants.js';

const DragAndDropReducer = (state = initialState.dragAndDrop, action) => {
    switch (action.type) {
        case DragAndDropConstants.ON_DROP:
            return state.set('preview', action.preview);
        default: //otherwise state is lost!
            return state;
    }
};

export default DragAndDropReducer
