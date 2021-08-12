import { Link, useParams, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import PokemonAbout from './PokemonAbout'
import PokemonChar from './PokemonChar'
import PokemonEncounters from './PokemonEncounters'
import Loader from './Loader'

import getPokemons from '../services/getPokemons'

const Pokemon = () => {
    
    const { PokemonName } = useParams()    

    const [ moves, setMoves ] = useState([])
    const [ types, setTypes ] = useState([])
    const [ pokedexNumber, setPokedexNumber ] = useState(0)
    const [ pokemonImg, setPokemonImg ] = useState('')    
    const [ isLoading, setIsLoading ] = useState(false)
    const [ weight, setWeight ] = useState(0)
    const [ height, setHeight ] = useState(0)
    const [ abilities, setAbilities ] = useState([])
    const [ species, setSpecies ] = useState('')
    const [ speciesURL, setSpeciesURL ] = useState('')
    const [ colorByType, setColorByType ] = useState('')


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
        console.log(PokemonName)
        getPokemons(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)     
            .then(pokemon => {
                setIsLoading(false)
                
                setMoves(pokemon.moves)
                setTypes(pokemon.types)
                setPokedexNumber(pokemon.order)

                if (pokemon.sprites.other['official-artwork']['front_default'] !== null) {
                    setPokemonImg(pokemon.sprites.other['official-artwork']['front_default']) 

                } else {
                    setPokemonImg(pokemon.sprites.front_default)
                }
               
                setWeight(pokemon.weight)
                setHeight(pokemon.height)
                setAbilities(pokemon.abilities)
                setSpeciesURL(pokemon.species.url)
                setColorByType(pokemon.types[0].type.name)


                setIsLoading(true)
                getPokemons(pokemon.species.url)
                .then(text => {                    
                    setSpecies(text.flavor_text_entries[5].flavor_text)
                    setIsLoading(false)
                })

            })
   }, [PokemonName])

  
    
    return (
        <div className='card pokemon-container' style={{'background': colors[colorByType]}}> 
                       
            <div>
                <Link to={'/pokedex'}  className='arrow-back'> <i className="fas fa-angle-left"></i> </Link>
                    
                <div>
                    {(!isLoading) 
                        ?  <div className='d-flex'>                        
                                <p className='pokedex-id'> #{pokedexNumber}</p>  
                                <img className='pokemon-img' src={pokemonImg} alt={PokemonName}/>  
                            </div>  
                        : <Loader />}
                   
                        <h1 className='pokemon-title-1'>{PokemonName.charAt(0).toUpperCase() + PokemonName.slice(1)}</h1>   

                     
                </div> 
            </div>  
               

            <Router>
                <div className='char-container'>
                
                    <div className='pokemon-nav'>
                        <Link to={`/pokedex/pokemon/${PokemonName}/moves`} className='pokemon-nav-li'>Movimientos</Link>
                        <Link to={`/pokedex/pokemon/${PokemonName}/details`} className='pokemon-nav-li'>Detalles</Link>
                        <Link to={`/pokedex/pokemon/${PokemonName}/encounters`} className='pokemon-nav-li'>Encuentros</Link>
                    </div>
                        
            
                    <Switch>
                        <Route path={`/pokedex/pokemon/:PokemonName/moves`}>
                            <PokemonAbout moves={moves}/>
                        </Route> 
                        <Route path={`/pokedex/pokemon/:PokemonName/details`}>
                            <PokemonChar abilities={abilities} weight={weight} height={height} types={types} species={species}/>
                        </Route> 
                        <Route path={`/pokedex/pokemon/:PokemonName/encounters`}>
                            <PokemonEncounters />
                        </Route> 
                    </Switch>

                </div>
            </Router>
       
        </div>

        
    )
}

export default Pokemon