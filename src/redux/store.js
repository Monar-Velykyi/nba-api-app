import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import { leagueData } from './leagues-reducer'
import { leaguesTeamData } from './teams-reducer'
import { teamData } from './leagues_team-reducer'


const reducer = combineReducers({
    leagueData,
    leaguesTeamData,
    teamData,
    form: formReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store