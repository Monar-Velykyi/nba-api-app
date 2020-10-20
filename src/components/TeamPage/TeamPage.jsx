import React ,{useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import {getAllTeamData} from '../../redux/actions'
import style from './TeamPage.module.css'
import { Link } from 'react-router-dom';

const TeamPage = ({location, getTeamData, games, players, loading}) => {
    console.log(loading)
    

    useEffect(() => {
        getTeamData(location.propsSearch)
        console.log('data upload')
    },[])


    const listOfPlayers = players
    .map(({fullName, lastName, country, dateOfBirth}) => (
        <div className={style.playersItem}>
            <span className={style.names}>{fullName} {lastName}, {country}, {dateOfBirth}</span>
        </div>
    ))

    const listOfGames = games
    .map(({city, arena, vTeam, hTeam}) => (
        <div className={style.gameItem}>
            <h4 className={style.matchInfo}>{city},{arena}</h4>
            <div className={style.teams}>
                <Link onClick={(e) => getTeamData(e.currentTarget.id)} id={vTeam.teamId}>
                    <div className={style.vTeam}>
                        <img src={vTeam.logo} className={style.logo} id={vTeam.teamId}/>
                        <span className={style.teamInfo}>{vTeam.fullName}, {vTeam.city}</span>
                    </div>
                </Link>
                <div className={style.score}>
                    <span>{vTeam.score.points}</span>:<span>{hTeam.score.points}</span>
                </div>
                <Link onClick={(e) => getTeamData(e.currentTarget.id)} id={hTeam.teamId}>
                    <div className={style.hTeam} id={hTeam.teamId}> 
                        <img src={hTeam.logo} className={style.logo}/>
                        <span>{hTeam.fullName}, {hTeam.city}</span>
                    </div>
                </Link>
            </div>
        </div>
    ))
    return loading ? (
        <div className={style.loader}>Loading...</div>
    ) : (
        <div className={style.body}>
        <h2>Список игроков команды</h2>
            <div className={style.listOfPlayerItems}>
            {listOfPlayers}
            {console.log(players)}
        </div>
            <h2>Список игр</h2>
            <div className={style.listOfGameItems}>
            {listOfGames}
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    console.log('this is state', state)
    return {
        loading: state.teamData.loading,
        games: state.teamData.games,
        players: state.teamData.players
    };
 }
 let mapDispatchToProps = (dispatch) => {
    return {
        getTeamData: (teamId) => {
            dispatch(getAllTeamData(teamId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)