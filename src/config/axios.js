import axios from "axios";
import Cookie  from "js-cookie";

// https://tmp.prz.rrf.mybluehost.me/api
// http://127.0.0.1:5000/api
export default axios.create({
    baseURL:"https://tmp.prz.rrf.mybluehost.me/api",
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${Cookie.get('token')}`
    }
});
