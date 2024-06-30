import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "./snackBarReducer";

import { contentHistoryService } from '../services/contentHistory.service'

export const contentHistorySlice = createSlice({
    name: "contentHistory",
    initialState: {
        saveContentHistoryStatus: false
    },
    reducers: {
        saveContentHistoryRequest: state => {
            state.saveContentHistoryStatusState = true
        },
        saveContentHistorySuccess: (state, action) => {
            state.saveContentHistoryStatusState = false;
        },
        saveContentHistoryFailed: (state, action) => {
            state.saveContentHistoryStatusState = false;
        }
    }
});

const {
    saveContentHistoryFailed, saveContentHistoryRequest, saveContentHistorySuccess,
} = contentHistorySlice.actions;

export const saveContentHistory = (data) => async (dispatch) => {

    dispatch(saveContentHistoryRequest());

    try {
        var payload = await contentHistoryService.saveContentHistory(data);
        dispatch(saveContentHistorySuccess(payload));
        return payload;
    } catch (error) {
        dispatch(saveContentHistoryFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default contentHistorySlice.reducer;