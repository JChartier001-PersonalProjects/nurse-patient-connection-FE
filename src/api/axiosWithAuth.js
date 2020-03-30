import axios from "axios";

export function getToken() {
    return localStorage.getItem('token');
}

export default function(){
    return axios.create({
        // baseURL: "'http://localhost:4000/",
        // "https://connections-p-n.herokuapp.com/",
        headers: {
            Authorization: getToken()
        }
    })
}