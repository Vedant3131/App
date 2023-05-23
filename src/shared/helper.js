import axios from "axios";
import { createContext } from "react";

export const Context = createContext();
export const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
export const Server = axios.create({ baseURL: BACKEND_BASE_URL });
