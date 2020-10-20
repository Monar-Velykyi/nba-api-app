import {
    LEAGUE_TEAMS_DATA_REQUEST,
    LEAGUE_TEAMS_DATA_SUCCES,
    LEAGUE_TEAMS_DATA_ERROR,
    ORDER_TEAMS_BY_NAME,
    ORDER_TEAMS_BY_NAME_REQUEST
}
from './actions'

const initialState = {
    loading: true,
    teams: [],
    filteredTeams: [],
    filterType: ''
}

export const leaguesTeamData = (state = initialState, action) => {
    switch (action.type) {
        case LEAGUE_TEAMS_DATA_REQUEST:
            return {...state, loading: true }
        case LEAGUE_TEAMS_DATA_SUCCES:
            return { loading: false, teams: action.payload, filteredTeams: action.payload, error: '' }
        case ORDER_TEAMS_BY_NAME_REQUEST:
            return {...state, loading: true, filteredTeams: [] }
        case ORDER_TEAMS_BY_NAME:
            return {
                ...state,
                loading: false,
                filteredTeams: action.payload.teams,
                filterType: action.payload.type
            };
        case LEAGUE_TEAMS_DATA_ERROR:
            return { loading: false, teams: [], error: action.error }
        default:
            return state
    }
}