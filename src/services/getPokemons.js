import axios from 'axios';

const getPokemons = (url) => {
    console.log(url)
    const promise = axios.get(url, { headers : { 
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
       }}).then(res => res.data)

    return promise
}

export default getPokemons;