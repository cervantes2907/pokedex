
const PokemonAbout = ({ moves }) => {    

    const list = moves.map((elem) => {
        return <span className='type-container move-container' style={{margin: '10px', display: 'inline-block'}} key={elem.move.name}>{elem.move.name}</span>
    })           
            
     
    return (
        <div className='pokemon-chars moves-container'>          
                {list}     
        </div>
    )
}

export default PokemonAbout