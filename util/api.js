import axios from "axios";
//import publicRuntimeConfig from "./index";
export const Axios = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 50000,
  //headers: { "X-Custom-Header": "foobar" },
});
