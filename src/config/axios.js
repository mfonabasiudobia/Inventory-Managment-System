import axios from "axios";
import Cookie  from "js-cookie";

export default axios.create({
    baseURL:"http://127.0.0.1:5000/api",
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${Cookie.get('token')}`
    }
});
