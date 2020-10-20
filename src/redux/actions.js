import axios from 'axios'

export const LEAGUE_DATA_REQUEST = 'LEAGUE_DATA_REQUEST'

export const LEAGUE_DATA_SUCCES = 'LEAGUE_DATA_SUCCES'

export const LEAGUE_DATA_ERROR = 'LEAGUE_DATA_ERROR'

export const LEAGUE_TEAMS_DATA_REQUEST = 'LEAGUE_TEAMS_DATA_REQUEST'

export const LEAGUE_TEAMS_DATA_SUCCES = 'LEAGUE_TEAMS_DATA_SUCCES'

export const LEAGUE_TEAMS_DATA_ERROR = 'LEAGUE_TEAMS_DATA_ERROR'

export const TEAM_DATA_REQUEST = 'TEAM_DATA_REQUEST'

export const TEAM_DATA_SUCCES = 'TEAM_DATA_SUCCES'

export const TEAM_DATA_ERROR = 'TEAM_DATA_ERROR'

export const ORDER_TEAMS_BY_NAME = 'ORDER_TEAMS_BY_NAME'

export const ORDER_TEAMS_BY_NAME_REQUEST = 'ORDER_TEAMS_BY_NAME_REQUEST'

const fetchingDataRequest = () => {
    return {
        type: LEAGUE_DATA_REQUEST
    }
}

const fetchingDataSuccess = (data) => {
    return {
        type: LEAGUE_DATA_SUCCES,
        payload: data
    }
}

const fetchingDataError = (error) => {
    return {
        type: LEAGUE_DATA_ERROR,
        error: error
    }
}

const fetchingLeaguesTeamRequest = () => {
    return {
        type: LEAGUE_TEAMS_DATA_REQUEST
    }
}

const fetchingLeaguesTeamSuccess = (data) => {
    return {
        type: LEAGUE_TEAMS_DATA_SUCCES,
        payload: data
    }
}

const fetchingLeaguesTeamError = (error) => {
    return {
        type: LEAGUE_TEAMS_DATA_ERROR,
        error: error
    }
}

const fetchingTeamDataRequest = () => {
    return {
        type: TEAM_DATA_REQUEST
    }
}

const fetchingTeamDataSuccess = (data) => {
    return {
        type: TEAM_DATA_SUCCES,
        payload: data
    }
}

const fetchingTeamDataError = (error) => {
    return {
        type: TEAM_DATA_ERROR,
        error: error
    }
}
const orderByNameRequest = () => {
    return {
        type: ORDER_TEAMS_BY_NAME_REQUEST
    }
}

const orderByNameSucces = (teams, type) => {
    return {
        type: ORDER_TEAMS_BY_NAME,
        payload: {
            teams: teams,
            type: type
        },
    }
}

export const getAllLeagues = () => {
    const options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/leagues/',
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': 'f11cf9c50fmsh110b56fdd7af978p19b4e6jsn483ad21f2e1e'
        }
    };
    return dispatch => {
        dispatch(fetchingDataRequest())
        axios.request(options)
            .then((response) => {
                const data = response.data.api.leagues
                dispatch(fetchingDataSuccess(data))
            }).catch((err) => {
                fetchingDataError(err)
            })
    }
}

export const getAllLeagueTeams = (league) => {
    const options = {
        method: 'GET',
        url: `https://rapidapi.p.rapidapi.com/teams/league/${league}`,
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': 'f11cf9c50fmsh110b56fdd7af978p19b4e6jsn483ad21f2e1e'
        }
    };
    return dispatch => {
        dispatch(fetchingLeaguesTeamRequest())
        axios.request(options)
            .then((response) => {
                const data = response.data.api.teams
                dispatch(fetchingLeaguesTeamSuccess(data))
            }).catch((err) => {
                fetchingLeaguesTeamError(err)
            })
    }
}

export const getAllTeamData = (teamId) => {
    const optionsForPlayers = {
        method: 'GET',
        url: `https://rapidapi.p.rapidapi.com/players/teamId/${teamId}`,
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': 'f11cf9c50fmsh110b56fdd7af978p19b4e6jsn483ad21f2e1e'
        }
    };

    const optionsForGames = {
        method: 'GET',
        url: `https://rapidapi.p.rapidapi.com/games/teamId/${teamId}`,
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': 'f11cf9c50fmsh110b56fdd7af978p19b4e6jsn483ad21f2e1e'
        }
    };

    const data = {}

    return dispatch => {
        dispatch(fetchingTeamDataRequest())
        axios.all([
                axios.request(optionsForPlayers),
                axios.request(optionsForGames)
            ])
            .then(
                axios.spread((...allData) => {
                    data.players = allData[0].data.api.players
                    data.games = allData[1].data.api.games
                    dispatch(fetchingTeamDataSuccess(data))
                }))
            .catch((err) => {
                fetchingTeamDataError(err)
            })
    }
}

export const sortProducts = (teams, type) => (dispatch) => {
    dispatch(orderByNameRequest())
    if (type !== 'fullName') {
        teams.sort(function(a, b) {
            if (a.city < b.city) { return -1; }
            if (a.city > b.city) { return 1; }
            return 0;
        })
    } else {
        teams.sort(function(a, b) {
            if (a.fullName < b.fullName) { return -1; }
            if (a.fullName > b.fullName) { return 1; }
            return 0;
        })
    }
    dispatch(orderByNameSucces(teams, type));
};