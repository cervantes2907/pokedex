import pokeball from '../asserts/pokeball-loader.png'

const Loader = () => {
    return (
        <div>
            <img src={pokeball} alt='pokeball' className='loader'/>
        </div>
    )
}

export default Loader