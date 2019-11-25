import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('continuing from the summary');
        this.props.history.replace('/checkout/contact-form');
    } 
    
    render() {
        let summary = <Redirect to= "/" />
        if(this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to ="/" /> : null;
           summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary ingredients={this.props.ings} 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-form'} 
                render={(props)=> (<ContactData ingredients={this.props.ings}
                price={this.props.price} 
                {...props}/>)} />
                <p>CHEF</p>
            </div>);
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.orders.purchased
    }
}
export default connect(mapStateToProps)(Checkout);