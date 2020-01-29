import axios from "axios";
import endPoint from "../endpoint";

const baseURL =  endPoint.obtenirServiceEndPoint(location.href);
export default axios.create({
  baseURL
});
