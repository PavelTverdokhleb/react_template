import * as types from './constants.jsx';

export function updateTabs(data) {
    return {
        type: types.UPDATE_TABS,
        data
    }
}