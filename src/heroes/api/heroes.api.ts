import axios from "axios"; 

const url = import.meta.env.VITE_API_URL; 

const heroesApi = axios.create({
    baseURL: `${url}/api/heroes`
}); 

export default heroesApi;