//npm install axios

//Libraries Import
//https://thecatapi.com/#pricing
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_050rL4FvwYWW9btbjOrmnk939SUl98fjPGOp3qTkjtYVXmOyzfMyGxwIKTqnG4Fg";

export const fetchBreeds = () => {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => response.data)
        .catch(error => Promise.reject(error));
};

export const fetchCatByBreed = (breedId) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
};