import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return ( 
        <Aux>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div style={{height: '10%', marginBottom: '1rem'}}>
                    <Logo height="100%" /></div>
                <nav>
                    <NavigationItems isAuth = {props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;