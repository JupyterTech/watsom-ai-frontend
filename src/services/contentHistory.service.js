import  { authHeader, handleResponse } from '../utils';
import { GPT_SERVER } from '../config/constants';

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

    const response = fetch(`${GPT_SERVER}/content_history/register`, requestOptions);
    return await handleResponse(response);
}

export const contentHistoryService = {
    saveContentHistory,
}