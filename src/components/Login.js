import { useHistory } from 'react-router-dom'
import { useAuth } from '../provider/AuthProvider'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'


const Login = () => {
    
    const { register, handleSubmit } = useForm()
    const { signIn, trainer } = useAuth()
    const history = useHistory()

    const onSubmit = (values) => {   
           
        signIn(values.trainer, () => { })
        
    }

    useEffect( () => {
        if (trainer) {                        
            history.push('/pokedex')
        }
    }, [trainer, history])
    
    return (
        <>
            <form className='login-container' onSubmit={handleSubmit(onSubmit)}>
                <img className='pokemon-logo' alt='pokemon-logo' src='https://1000marcas.net/wp-content/uploads/2020/01/Pok%C3%A9mon-emblema.jpg'/>                    

               <div className='input-container'>                    
                    <h1 className='mb-4'>Bienvenido entrenador</h1>
                    
                    <input className='input-login' placeholder='Agrega tu nombre' {...register('trainer')}/>

                    <button className='btn btn-primary btn-login'>Log in</button>         
               </div>   

            </form>
        </>
    )
}

export default Login