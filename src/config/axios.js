import axios from "axios";
import Cookie  from "js-cookie";

// http://testapp2.studyhub.ng/api/user/auth
// http://127.0.0.1:5000/api
export default axios.create({
    baseURL:"http://testapp2.studyhub.ng/api",
    withCredentials : true,
    headers: {
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization' : `Bearer ${Cookie.get('token')}`
    }
});
