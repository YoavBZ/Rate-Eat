import {HomeActionsConstants} from './constants.js';

function changePage(page) {
    return {
        type: HomeActionsConstants.CHANGE_PAGE,
        page
    }
};

let HomeActions = {
    changePage
};

export default HomeActions