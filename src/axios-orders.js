import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-4d360.firebaseio.com/'
});

export default instance;