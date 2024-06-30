import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "./snackBarReducer";

import { contentHistoryService } from '../services/contentHistory.service'

export const contentHistorySlice = createSlice({
    name: "contentHistory",
    initialState: {
        condition: {
            filter: "",
            showCount: 10,
            sortby: "Date Created",
            currentPage: 0,
            user_id: ""
        },
        contentHistory: [],
        contentHistoryCount: 0,
        getContentHistoryStatus: false,
        setHistoryConditionStatus: false,
        saveContentHistoryStatus: false,
    },
    reducers: {
        saveContentHistoryRequest: state => {
            state.saveContentHistoryStatus = true
        },
        saveContentHistorySuccess: (state, action) => {
            state.saveContentHistoryStatus = false;
        },
        saveContentHistoryFailed: (state, action) => {
            state.saveContentHistoryStatus = false;
        },
        setHistoryConditionRequest: state => {
            state.setHistoryConditionStatus = true
        },
        setHistoryConditionSuccess: (state, action) => {
            state.setHistoryConditionStatus = false;
            state.condition = action.payload;
        },
        setHistoryConditionFailed: (state, action) => {
            state.setHistoryConditionStatus = false;
        },
        getContentHistoryRequest: state => {
            state.getContentHistoryStatus = true
        },
        getContentHistorySuccess: (state, action) => {
            state.getContentHistoryStatus = false;
            state.contentHistory = action.payload.contentHistory;
            state.contentHistoryCount = action.payload.contentHistoryCount;
        },
        getContentHistoryFailed: (state, action) => {
            state.getContentHistoryStatus = false;
        }
    }
});

const {
    saveContentHistoryFailed, saveContentHistoryRequest, saveContentHistorySuccess,
    setHistoryConditionFailed, setHistoryConditionRequest, setHistoryConditionSuccess,
    getContentHistoryFailed, getContentHistoryRequest, getContentHistorySuccess
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

export const setHistoryCondition = (condition) => async (dispatch) => {

    dispatch(setHistoryConditionRequest());

    try {
        dispatch(setHistoryConditionSuccess(condition));

    } catch (error) {
        dispatch(setHistoryConditionFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export const getContentHistory = (condition) => async (dispatch) => {

    dispatch(getContentHistoryRequest());

    try {
        var payload = await contentHistoryService.getContentHistory(condition);
        dispatch(getContentHistorySuccess(payload));
        return payload;
    } catch (error) {
        dispatch(getContentHistoryFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        return false;
    }
}

export default contentHistorySlice.reducer;