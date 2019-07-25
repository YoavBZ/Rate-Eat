import DragAndDropConstants from './constants.js';
import initialState from '../../initialState';

function onDrop(files, preview) {
    return {
        type: DragAndDropConstants.ON_DROP,
        files,
        preview
    }
}

let DragAndDropActions = {
    onDrop,
};

export default DragAndDropActions