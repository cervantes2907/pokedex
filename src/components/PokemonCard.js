import { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Loader from './Loader'


import getPokemons from '../services/getPokemons'

const PokemonCard = ( { urlPokemon, name } ) => {
    const { url } = useRouteMatch()
    const [ pokemonImage, setPokemonImage ] = useState('')
    const [ speed, setSpeed ] = useState('')
    const [ hp, setHp ] = useState('')
    const [ attack, setAttack ] = useState('')
    const [ defense, setDefense ] = useState('')
    const [ type, setType ] = useState('')    
    const [ colorByType, setColorByType ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
   
    const colors = {
        'bug':      '#94bc4a',
        'dragon':   '#6a7baf', 
        'dark' :	'#736c75',
        'electric': '#e5c531',
        'fairy': 	'#e397d1',
        'fighting':	'#cb5f48',
        'fire': 	'#ea7a3c',
        'flying' :	'#7da6de',
        'ghost' :	'#846ab6',
        'grass' :	'#71c558',
        'ground': 	'#cc9f4f',
        'ice' :	    '#70cbd4',
        'normal': 	'#aab09f',
        'poison': 	'#b468b7',
        'psychic': 	'#e5709b',
        'rock': 	'#b2a061',
        'steel': 	'#89a1b0 ',
        'water': 	'#539ae2',
    }

    useEffect( () => {      
        setIsLoading(true)  
        getPokemons(urlPokemon)
            .then(data => {   
                (data.sprites.other['official-artwork'].front_default !== null)
                    ? setPokemonImage(data.sprites.other['official-artwork'].front_default)
                    : setPokemonImage(data.sprites.front_default)
                    setIsLoading(false)
                setHp(data.stats[0].base_stat)
                setAttack(data.stats[1].base_stat)
                setDefense(data.stats[2].base_stat)
                setSpeed(data.stats[5].base_stat)      
                setType(data.types)                                     
            })

    }, [urlPokemon])

    useEffect(()=>{
       
        if(type) setColorByType(type[0].type.name)
        

    }, [type])

    const handleTypes = (type) => {        

        if (type) {
            const list = type.map( (elem) => {
                return  <span className='type-container' key={elem.type.name}>{elem.type.name}</span>
            })

            return (
                <div className='card-types'>
                    {list}                       
                </div>
            )
        }    
    }    

    return (        
        <Link className='card card-container' style={{'background': colors[colorByType]}} to={`${url}/pokemon/${name}`}>
        
            <div className='card-head'>           
                <div className='pokemon-card-image-container'>
                    {(isLoading) ? <Loader /> : <img src={pokemonImage} className='pokemon-card-image' alt={`pokemon-${name}`}/>}               
                </div>
                
                <div className='pokemon-title-2' >{name.charAt(0).toUpperCase() + name.slice(1)}</div>           
            </div>

            <div className='card-body'>

                <div className='card-info'>
                    
                    <p>HP: {hp}</p>
                    <p>Attack: {attack}</p>
                    <p>Def.: {defense}</p>
                    <p>Speed: {speed}</p>
                </div>

                {handleTypes(type)}
                
            </div> 
     
        </Link>
    )
}

export default PokemonCard;