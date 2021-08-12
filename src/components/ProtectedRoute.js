import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../provider/AuthProvider"

const ProtectedRoute = ( { children, ...props }) => {
    
    const { trainer } = useAuth()
    
    return (<Route 
    {...props} 
    render={ ({ location}) => 
        (trainer 
            ?  children 
            : <Redirect to={{pathname: '/', state: { from: location }}}/>) } 
            
            />
            )
}

export default ProtectedRoute;