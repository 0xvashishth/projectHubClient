import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:44333',
});

export default instance;