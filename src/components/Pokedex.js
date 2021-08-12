import { useEffect, useState } from 'react'

import Navigator from './Navigator'
import PokemonCard from "./PokemonCard"
import Loader from './Loader'
import Pagination from './Pagination'

import getPokemons from '../services/getPokemons'


const Pokedex = () => {
    
    const URL_BASE = 'https://pokeapi.co/api/v2'
    
    const [ pokemons, setPokemons ] = useState([])    
    const [ pokemonsAmount, setPokemonsAmount ] = useState(0)
    const [ types, setTypes ] = useState([])
    const [ pokemonsPerPage, setPokemonsPerPage ] = useState(4) 
    const [ selectedType, setSelectedType ] = useState('')
    const [ toSearch, setToSearch ] = useState('')
    const [ filteredPokemons, setFilteredPokemons ] = useState([])
    
  
    
    const [ isLoading, setIsLoading ] = useState(false)
    
    
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(4)

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ maxPageNumberLimit, setMaxPageNumberLimit ] = useState(10)
    const [ minPageNumberLimit, setMinPageNumberLimit ] = useState(0)
    const [ paginationLength ] = useState(10)

    
        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
        const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)


    useEffect( () => {        
        setIsLoading(true)
        console.log("1")
        getPokemons(`${URL_BASE}/pokemon?limit=1118&offset=0`)
            .then(data => {                     
                setIsLoading(false)         
                setPokemons(data.results)                
                setPokemonsAmount(data.count)     
            })


            getPokemons(URL_BASE+'/type')
            .then(pokemon => {
                setTypes(pokemon.results)
            })
            
    }, [])  


    useEffect( () => {
        if(selectedType) {

            if (selectedType !== 'all') {
                getPokemons(`${URL_BASE}/type/${selectedType}`)
                    .then(res => {

                        const copy = []
                        res.pokemon.forEach((elem) => copy.push(elem.pokemon))
                        setPokemons(copy)                    
                    })
            } else {
                    getPokemons(`${URL_BASE}/pokemon?limit=${pokemonsAmount}&offset=0`)
                        .then(data => {
                            setPokemons(data.results)
                        })
                }
            }
    }, [selectedType, pokemonsAmount])

    
    useEffect(() => {
        setFilteredPokemons(pokemons.filter( pokemon => {
            return pokemon.name.toLowerCase().includes(toSearch.toLowerCase())
        }))

    }, [toSearch, pokemons])   

    useEffect(() => {

    }, [paginationLength])
  
    
    const onSubmit = (value) => {
        setToSearch(value.value)
    }

    const handleSelectType = (e) => {
        setSelectedType(e.target.value)        
    }

    const handleSelectAmount = (e) => {
        setPokemonsPerPage(e.target.value)        
    }

 

    const paginate = (pageNum) => {
        setCurrentPage(pageNum)
    }


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage-1)
        } else {
            return null
        }            
        if (currentPage - 1 === minPageNumberLimit) {        
            setMaxPageNumberLimit(maxPageNumberLimit - paginationLength)
            setMinPageNumberLimit(minPageNumberLimit - paginationLength)
        }
    }

    const handleNextPage = () => {
        if(currentPage < indexOfLastPokemon) {
            setCurrentPage(currentPage+1)
        } else {
            return null
        }         
        
        if (currentPage === maxPageNumberLimit) {    
            setMaxPageNumberLimit(maxPageNumberLimit + paginationLength)
            setMinPageNumberLimit(minPageNumberLimit + paginationLength)
        }
    }

    const listOfPokemons = currentPokemons.slice(0, pokemonsPerPage).map( (elem) => {
      
        return (
            <div className='col-3' key={elem.name}>
                <PokemonCard urlPokemon={elem.url} name={elem.name} />
            </div>
        )
    })

    return (
        <div className='pokedex'>  
        
            <div>
                <Navigator types={types} handleSelectAmount={handleSelectAmount} handleSelectType={handleSelectType} onSubmit={onSubmit}/>      
            <div>

            
                <img className='pokemon-logo-pokedex' alt='pokemon-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png'/>                    
            </div>

            <div className='cards-container'> { (!isLoading) ? listOfPokemons : <Loader /> } </div>
            <div className='container-pagination'>
                <Pagination 
                    paginate={paginate} 
                    pokemonsAmount={pokemonsAmount} 
                    pokemonsPerPage={currentPokemons.length} 
                    minPageNumberLimit={minPageNumberLimit} 
                    maxPageNumberLimit={maxPageNumberLimit} 
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    currentPage={currentPage}
                    />
            </div>
            </div>



        </div>
    )
}

export default Pokedex; 