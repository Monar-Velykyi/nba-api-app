import React from 'react';
import TeamElement from './TeamElement/TeamElement'
import style from './TeamInfo.module.css'
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {compose} from 'redux'

const TeamInfo = ({teams}) => {
    
    const teamItem = teams
    .map(({teamId, nickname, fullName, city, logo}) => (
            <TeamElement 
                id={teamId} 
                nickname={nickname}
                fullName={fullName}
                city={city}
                logo={logo} />
        ))

    return teams.loading ? (
        <div className={style.loader}>Loading</div>
    ) : (
    <div className={style.teamItems}>
        {teamItem}
    </div> 
    )
}

const mapStateToProps = (state) => {
    
    return {
        teams: state.leaguesTeamData.filteredTeams
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(TeamInfo)