import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export {getlname, getfname, getlistdir, getlog, getlistfiles, getstar, getuserdata};

function getlname() {
    const url = `${BASE_URL}/lname`;
    return axios.get(url).then(response => response.data);

}

function getfname() {
    const url = `${BASE_URL}/fname`;
    return axios.get(url).then(response => response.data);
}


function getlistdir() {
    const url = `${BASE_URL}/listdir`;
    return axios.get(url).then(response => response.data);
}

function getlistfiles() {
    const url = `${BASE_URL}/listfiles`;
    return axios.get(url).then(response => response.data);
}

function getlog() {
    const url = `${BASE_URL}/log`;
    return axios.get(url).then(response => response.data);
}

function getstar() {
    const url = `${BASE_URL}/getstar`;
    return axios.get(url).then(response => response.data);
}

function getuserdata() {
    const url = `${BASE_URL}/userdata`;
    return axios.get(url).then(response => response.data);
}