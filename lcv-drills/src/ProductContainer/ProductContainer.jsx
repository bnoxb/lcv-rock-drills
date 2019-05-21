import React, { Component } from 'react';
import CreateProduct from './CreateProduct/CreateProduct';

class ProductContainer extends Component {
    constructor(){
        super();
        this.state = {
            createProduct: false
        }
    }

    createButton = () => {
        console.log('changing the create state');
        this.setState({
            createProduct: !this.state.createProduct
        });
    }

    render(){
        return(
            <div>
                {this.state.createProduct ? <CreateProduct closeForm={this.createButton} /> : <button onClick={this.createButton}>Create New Part List</button> }
                ALL THE PRODUCTSSS YEEEEAAAAHHHHH
            </div>

        )
    }
}

export default ProductContainer;