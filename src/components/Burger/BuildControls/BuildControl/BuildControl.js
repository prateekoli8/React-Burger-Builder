import React from 'react';
import classes from './BuildConrol.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <p className={classes.Label}>{props.label}</p>
            <button className={classes.Less} 
            disabled = {props.ingredientsCount === 0? true: false }
            onClick={props.removed}>-</button>
            <p className={classes.Quantity}>{props.ingredientsCount}</p>
            <button className={classes.More} 
            disabled = {props.ingredientsCount === 9? true: false }
            onClick={props.added}>+</button>
        </div>
    );
}

export default buildControl;