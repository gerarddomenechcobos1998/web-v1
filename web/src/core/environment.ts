import { Platform } from "react-native";

// IP of the server that is hosting the Data Base. Port of the express api, you can check the extension at index.js (at backend folder)
const isWeb = () => {
    try{
      const web = window.location.origin
      return 'web';
    }catch(e){
      return 'native'
    }
  }
const localhost = isWeb() == 'web' ? window.location.origin:'https://gerard.sixedge.es';
//192.168.0.13
// Extension of the api: 'api', you can check the extension at index.js (at backend folder)
const apiExtension = '/api';
// The apiURL is the composition of two strings
const apiUrl = localhost+apiExtension;

export default apiUrl;