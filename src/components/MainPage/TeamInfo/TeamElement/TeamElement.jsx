import React from 'react';
import style from './TeamElement.module.css'
import {Link } from 'react-router-dom';

const TeamElement = (props) => {
    
    return (
        <Link to={{
            pathname: "/teampage",
            propsSearch: props.id
        }}>
            <div className={style.teamCard}>
                <img src={props.logo} className={style.logo}/>
                <div className={style.names}>
                    <h1>{props.fullName}</h1>
                    <h2>{props.nickname}</h2>
                </div>
            </div>
        </Link>
    )
}

export default TeamElement