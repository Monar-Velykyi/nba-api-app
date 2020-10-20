import {
    TEAM_DATA_REQUEST,
    TEAM_DATA_SUCCES,
    TEAM_DATA_ERROR
}
from './actions'

const initialState = {
    loading: true,
    players: [],
    games: [],
    error: ''
}

export const teamData = (state = initialState, action) => {
    switch (action.type) {
        case TEAM_DATA_REQUEST:
            return {...state, loading: true }
        case TEAM_DATA_SUCCES:
            return {
                loading: false,
                players: action.payload.players,
                games: action.payload.games,
                error: '',
            }
        case TEAM_DATA_ERROR:
            return {...state, loading: false, players: [], teams: [], error: action.error }
        default:
            return state
    }
}