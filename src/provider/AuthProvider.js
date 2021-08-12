import { createContext, useContext, useState } from 'react'

const authContext = createContext()

const fakeAuthService = {
    login: (cb) => {
        setTimeout(cb, 500)
    }, 
    logout: (cb) => {
        setTimeout(cb, 500)
    }    
}

const  useProvideAuth = () => {
    const [ trainer, setTrainer ] = useState(null)

    const signIn = (name, cb) => {
        fakeAuthService.login( () => {
            setTrainer(name)
            cb()
        })
    }

    const signOut = (cb) => {
        fakeAuthService.logout( () => {
            setTrainer(null)
            cb()
        })
    }

    return {
        trainer,
        signIn,
        signOut        
    }
}

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()

    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
