import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }
    
    updatePurchasable = (ingredients) => {
        const ing = ingredients;
        const sum = Object.keys(ing)
        .map( (ingKey) => ing[ingKey])
        .reduce((sum, ele) => {
            return sum + ele;
        } , 0)
        return (sum > 0);
    }
    
    purchaseHandler = () => {
        if(this.props.isAuth)  {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {

        let orderSummary = null;

        let burger = this.props.error ? <p>Failed To Load the Page</p> : <Spinner />;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings} />
                    <div><BuildControls ingredientAdded = {this.props.onIngredientAdded} 
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    ingredientsCount = {this.props.ings} 
                    price = {this.props.price}
                    purchasable = {this.updatePurchasable(this.props.ings)}
                    ordered = {this.purchaseHandler}
                    /></div>
                </Aux>
            );

            orderSummary = <OrderSummary 
            price = {this.props.price}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            ingredients = {this.props.ings}></OrderSummary>;
            
            if(this.state.loading) {
                orderSummary = <Spinner />;
            }
        }

        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
} 

const mapStateToProps = state => {
    return { 
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.orders.purchased,
        isAuth: state.auth.token != null
    }
};

const mapDispatchToProps = dispatch => { 
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));