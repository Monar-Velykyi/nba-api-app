import React, {useEffect, useRef} from 'react';
import style from './MainPage.module.css';
import logo from '../../images/logo.png'
import TeamInfo from './TeamInfo/TeamInfo'
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {compose, bindActionCreators} from 'redux'
import {getAllLeagues, getAllLeagueTeams, sortProducts} from '../../redux/actions'

const MainPage = ({leagues, getLeagues, getLeaguesTeam, sortProducts, teams}) => {
    
    const styleSelect = useRef(null)

    useEffect(() => {
        getLeagues()
    },[])

    const leaguesData = leagues
    .map((name) => (<option value={name}>{name}</option>))

    return leagues.loading ? (
        <div className={style.loader}>Loading</div>
    ) : leagues.error ? (
        <div>
            {leagues.error}
        </div>
    ) : (
        <div>
            <div className={style.header}>
                <img src={logo} alt="" className={style.logo}/>
                <div className={style.select}>
                    <select name="slct" 
                    id="slct" 
                    ref={styleSelect}
                    onChange={() => getLeaguesTeam(styleSelect.current.value)}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {leaguesData}
                    </select>
                </div>
            </div>
            <div className={style.buttons}>
                <button type={'city'} onClick={(e) => sortProducts(teams, e.target.type)}>Фильтр по городам</button>
                <button type={'fullName'} onClick={(e) => sortProducts(teams, e.target.type)}>Фильтр по имени</button>
            </div>
            <TeamInfo/>
        </div>
    )
}

const mapStateToProps = (state) => {
    
    return {
        leagues: state.leagueData.leagues,
        teams: state.leaguesTeamData.teams
    };
 }
 let mapDispatchToProps = (dispatch) => {
    return {
        getLeagues: bindActionCreators(getAllLeagues, dispatch),
        getLeaguesTeam: (leagueId) => {
            dispatch(getAllLeagueTeams(leagueId))},
        sortProducts: (item, type) => {dispatch(sortProducts(item, type))}
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MainPage)

