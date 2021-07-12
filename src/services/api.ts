import Axios, { AxiosInstance } from "axios";

const AxiosObject: AxiosInstance = Axios.create({
  baseURL: "http://localhost:5000/api",
});

export default AxiosObject;
