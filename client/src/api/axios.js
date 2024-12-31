import axios from 'axios';

axios.defaults.baseURL = 'http://34.168.85.172:8035';

axios.defaults.timeout = 10000;

export default axios;
