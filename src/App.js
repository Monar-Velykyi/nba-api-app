import React from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage'
import Login from './components/Login/Login'
import TeamPage from './components/TeamPage/TeamPage'
import { Route , Switch, withRouter} from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

const App = (props) => {

    return ( 
        <div className="App">
            <Switch>
                <Route exact path='/' component={MainPage}/>
                <Route exact path='/login' component={Login}/>
                <PrivateRoute exact path='/teampage' component={props => <TeamPage {...props}/>}/>
            </Switch>
        </div>
    );
}

export default withRouter(App);

