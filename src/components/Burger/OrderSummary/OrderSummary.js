import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}:</span>{props.ingredients[igKey]}</li>);

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>A dank burger with the following shit in it:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked = {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked = {props.purchaseContinued}>CONFIRM</Button>
        </Aux>
    );
}

export default orderSummary;