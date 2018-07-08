import React, {Component} from 'react';
import Product from './Product';
import LoadingProducts from '../loaders/Products';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Products extends Component{
	constructor(){
		super();
	}
  	render(){
    	
		let productsData = this.props.productsList.map(product =>{
			return(
						<Product key={product._id} price={product.variants[0].price} name={product.title} image={product.variants[0].image} id={product.variants[0].sku} openModal={this.props.openModal}/>
				)
			}
		);



		// Empty and Loading States
		let view;
		if(productsData.length <= 0){
			view = <LoadingProducts />
		} else if(productsData.length <= 0){
			view = <NoResults />
		} else{
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300} 
				component="div"
				className="products">
					{productsData}
			</CSSTransitionGroup>
		}
		return(
			<div className="products-wrapper">
				{view}
			</div>
		)
	}
}

export default Products;