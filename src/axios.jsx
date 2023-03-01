import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7064/',
});

export default instance;