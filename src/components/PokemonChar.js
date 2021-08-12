

const PokemonChar = ({ abilities, weight, height, types, species }) => {    
    
    const abilitiesList = abilities.map( (ability, index) => {        
        return (
            <span className='ability-container' key={index}>{ability.ability.name}</span>
        )
    })

    const typesList = types.map( (type, index) => {
        return (
            <span className='ability-container' key={index}>{type.type.name}</span>
        )
    })

    return (
        <div className='pokemon-chars pokemon-detail moves-container'>
            <div className='col-6'>

                <div>
                    <h5>Tipos :</h5>
                    {typesList}
                </div>

                <div className='mt-3 mb-3'>
                    <h5>Abilidades :</h5>
                    {abilitiesList}
                </div>

                <div className='left-details-container'>
                    <div className='d-flex detail-center'>
                        <h5>Altura :&nbsp;</h5><span>{weight}hg.</span>
                    </div>

                    <div className='d-flex detail-center'>
                        <h5>Peso :&nbsp;</h5><span>{height}dm.</span>
                    </div>
                </div>

            </div>

            <div className='col-6 right-details-container'>
                <h5>About:</h5>
                <p>{species}</p>
            </div>
            
        </div>
    )
}

export default PokemonChar