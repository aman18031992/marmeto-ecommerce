//as image, sku, price, title.
//title(//image//sku//price)
import React, {Component} from 'react';


class Product extends Component{
	constructor(props){
		super(props);
        this.state = {
            quickViewProdcut: {},
        }
    }
    quickView(image, name, price, id){
        this.setState({
            quickViewProdcut: {
                image: image,
                name: name,
                price: price,
                id: id
            }
        }, function(){
            this.props.openModal(this.state.quickViewProdcut);
        })
    }
    render(){
        let image = this.props.image;
        let name = this.props.name;
        let price = this.props.price;
        let id = this.props.id;
        return(
            <div className="product">
                <div className="product-image">
                    <img src={image} alt={this.props.name}/>
                </div>
                <h4 className="product-name">{this.props.name}</h4>
                <p className="product-price">{this.props.price}</p>
            </div>
        )
    }
}

export default Product;
