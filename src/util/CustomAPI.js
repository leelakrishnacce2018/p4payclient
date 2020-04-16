import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

class CustomAPI {

  constructor() {
    console.log("Service is constructed");
  }

  getRestClient() {
    if (!this.serviceInstance) {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }

        const defaults = {headers: headers};
   

      this.serviceInstance = axios.create({
        baseURL: API_BASE_URL,
       // timeout: 10000,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
      });
    }
    return this.serviceInstance;
  }
}

export default (new CustomAPI());