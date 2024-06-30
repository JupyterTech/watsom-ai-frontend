import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const saveContentHistory = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/content_history/register`, requestOptions);
    return await handleResponse(response);
}

const getContentHistory = async (filter) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(filter)
    };

    const response = fetch(`${API_BASE}/content_history/gethistory`, requestOptions);
    return await handleResponse(response);
}

export const contentHistoryService = {
    saveContentHistory,
    getContentHistory
}