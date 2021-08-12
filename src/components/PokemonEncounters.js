import { useParams } from 'react-router-dom'

const PokemonEncounters = () => {

    const { PokemonName } = useParams()

    return (
        <div className='pokemon-chars overflow-auto moves-container'>
            <p> encuentros </p>
            <h1>{PokemonName}</h1>

        </div>
    )
}

export default PokemonEncounters