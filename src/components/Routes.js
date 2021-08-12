import { Route, Switch } from 'react-router-dom'

import Login from './Login'
import Pokedex from './Pokedex'
import Pokemon from './Pokemon'
import NoMatch from './NoMatch'
import ProtectedRoute from './ProtectedRoute'

const Routes = () => {    

    
    return (
        <Switch>
        
            <Route path='/' exact component={Login}/>

            <ProtectedRoute path='/pokedex' exact > 
                <Pokedex />
            </ProtectedRoute>

            <ProtectedRoute path='/pokedex/pokemon/:PokemonName' >
                <Pokemon />
            </ProtectedRoute>         

            <Route path='*' component={NoMatch}/>                       
           
        </Switch>
    )
}

export default Routes