const DEV_MODE = true;

export const GPT_SERVER = DEV_MODE === true ? process.env.REACT_APP_GPT_SERVER : process.env.REACT_APP_LIVE_GPT_SERVER_EC
export const API_BASE = DEV_MODE === true ? process.env.REACT_APP_API_BASE : process.env.REACT_APP_LIVE_API_BASE_EC

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
export const APP_SECRET = process.env.REACT_APP_APP_SECRET
export const SECRET_KEY= process.env.REACT_APP_SECRET_KEY
export const PLAN_ESSENTIAL= process.env.REACT_APP_PLAN_ESSENTIAL 
export const PLAN_PRO_MONTH= process.env.REACT_APP_PLAN_PRO_MONTH
export const PLAN_PRO_YEAR= process.env.REACT_APP_PLAN_PRO_YEAR