import { useAuth } from '../provider/AuthProvider'
import { useForm } from 'react-hook-form'


const Navigator = ({ types, handleSelectType, handleSelectAmount, onSubmit }) => {

    const { register, handleSubmit } = useForm()
    const { signOut, trainer } = useAuth()        
    
    const onSignOut = () => {
        signOut(() => { })
    }    

    const typeOptions = types.map((type) => { 
        return <option className='m-1' value={type.name} key={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
    })
    
    return (

        <nav className='navbar'>
            <div className='d-flex form-container'>
                <form  onChange={handleSubmit(onSubmit)} >
                    <input className='input' type='text' {...register('value')}  placeholder=' Pokemon...'/>   
                </form>
             
                    <select onChange={handleSelectType}>
                        <option defaultValue >Seleccione un tipo</option>
                        <option value={'all'}>Todos</option>
                        {typeOptions}
                    </select>

                    
                    <select className='select-numbers-pokemons' onChange={handleSelectAmount}>
                        <option defaultValue  value={null}>Seleccione</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                        <option value={20}>20</option>                       
                    </select>
            </div>
            

                <div className='d-flex'>
                    <div>
                        <h4 className=  'Hi'>  ¡Hola!, {trainer.charAt(0).toUpperCase() + trainer.slice(1)} </h4>
                    </div>                    
                    
                    <button className='btn btn-danger' onClick={onSignOut}><i className="fas fa-sign-out-alt"></i></button>
                </div>                   
        </nav>
    )
}

export default Navigator;