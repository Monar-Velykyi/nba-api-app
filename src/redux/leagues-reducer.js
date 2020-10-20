import {
    LEAGUE_DATA_REQUEST,
    LEAGUE_DATA_SUCCES,
    LEAGUE_DATA_ERROR
}
from './actions'

let initialState = {
    loading: false,
    error: '',
    leagues: []
}

export const leagueData = (state = initialState, action) => {
    switch (action.type) {
        case LEAGUE_DATA_REQUEST:
            return {...state, loading: true }
        case LEAGUE_DATA_SUCCES:
            return { loading: false, leagues: action.payload, error: '' }
        case LEAGUE_DATA_ERROR:
            return { loading: false, leagues: [], error: action.error }
        default:
            return state
    }
}