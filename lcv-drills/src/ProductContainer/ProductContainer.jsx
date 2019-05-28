import React, { Component } from 'react';
import CreateProduct from './CreateProduct/CreateProduct';
import ProductList from './ProductList/ProductList';

class ProductContainer extends Component {
    constructor(){
        super();
        this.state = {
            createProduct: false,
            showProducts: false,
            message: "",
            partsList: [],
            companyList: {
                gardnerDenver: {
                    stringName: "Gardner Denver",
                    partTypes: [
                        "Portable Compressor Parts and More",
                        "Drill Parts",
                        "Pump Parts"
                    ]
                },
                atlasCopCo: {
                    stringName: "Atlas Copco",
                    partTypes:[
                        "Parts List"
                    ]
                },
                joy: {
                    stringName: "Joy",
                    partTypes: [
                        "Drill Parts",
                        "Compressor Parts"
                    ]
                },
                chicagoPneumatic: {
                    stringName: "Chicago Pneumatic",
                    partTypes: [
                        "Drill Parts",
                        "Compressor Parts"
                    ]
                },
                ingersollRand: {
                    stringName: "Ingersoll Rand",
                    partTypes: [
                        "Drill Parts",
                        "Compressor Parts"
                    ],
                }
            },
        }
    }

    createButton = () => {
        this.setState({
            createProduct: !this.state.createProduct,
            message: ""
        });
    }

    showListButton = () => {
        this.setState({
            showProducts: !this.state.createProduct,
            message: ""
        });
    }

    upload = async (childData) => {
        const data = new FormData();
        data.append('file', childData.file);
        data.append('company', childData.company);
        data.append('type', childData.type);
        
        try{
            const response = await fetch('http://localhost:9000/parts/csv', {
                method: "POST",
                body: data
                
            });
            if(!response.ok){
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();
            this.setState({
                partsList: parsedResponse.data,
                createProduct: !this.state.createProduct,
                message: "Succesfully Uploaded Parts"
            });
            

        }catch(err){
            console.log(err);
        }

    }

    getTheParts = async (params) => {
        console.log('gonna get the parts');
        console.log(params);
        try{
            const stringURL = `http://localhost:9000/parts/browse/${params.company}/${params.type}`;
            const response = await fetch(stringURL);
            if(!response.ok){
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();
            this.setState({
                partsList: parsedResponse.data
            })

        }catch(err){
            console.log(err);
        }
    }

    render(){
        
        return(
            <div>
                {this.state.message}
                {this.state.createProduct ? <CreateProduct closeForm={this.createButton} upload={this.upload} companyList={this.state.companyList}/> : <button onClick={this.createButton}>UPLOAD CSV</button> }
                {this.state.showProducts ? <ProductList partsList={this.state.partsList} getTheParts={this.getTheParts} companyList={this.state.companyList}/> : <button onClick={this.showListButton}>Browse Parts</button>}
            </div>

        )
    }
}

export default ProductContainer;