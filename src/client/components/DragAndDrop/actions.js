import DragAndDropConstants from './constants.js';

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