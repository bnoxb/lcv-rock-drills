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
            companyList: {
                gardnerDenver: {
                    stringName: "Gardner Denver",
                    partTypes: {
                        "Portable Compressor Parts and More": [],
                        "Drill Parts": [],
                        "Pump Parts": []
                    },
                },
                atlasCopCo: {
                    stringName: "Atlas Copco",
                    partTypes:{
                        "Parts List": []
                    },
                },
                joy: {
                    stringName: "Joy",
                    partTypes: {
                        "Drill Parts": [],
                        "Compressor Parts": []
                    },
                },
                chicagoPneumatic: {
                    stringName: "Chicago Pneumatic",
                    partTypes: {
                        "Drill Parts": [],
                        "Compressor Parts": []
                    },
                },
                ingersollRand: {
                    stringName: "Ingersoll Rand",
                    partTypes: {
                        "Drill Parts": [],
                        "Compressor Parts": []
                    },
                }
            },
            companyHTML: null,
            partsList: []
        }
    }

    componentDidMount(){
        this.setCompanies();
    }

    createButton = () => {
        this.setState({
            createProduct: true,
            showProducts: false,
            message: ""
        });
    }

    showListButton = () => {
        this.setState({
            createProduct: false,
            showProducts: true,
            message: ""
        });
    }

    closeForm = (e) => {
        this.setState({
            [e.target.name]: false
        })
    }

    setCompanies = () => {
        const companies = Object.keys(this.state.companyList).map((company, i)=>{
            return(
                <option key={i} value={company}>{this.state.companyList[company].stringName}</option>
            )
        });
        this.setState({
            companyHTML: companies
        })
    }

    upload = async (childData) => {
        const data = new FormData();
        data.append('file', childData.file);
        data.append('company', childData.company);
        data.append('type', childData.type);
        data.append('companyKey', childData.companyKey);
        
        try{
            const response = await fetch('http://localhost:9000/parts/csv', {
                method: "POST",
                body: data
                
            });
            if(!response.ok){
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();
            console.log(parsedResponse.data);
            this.setState({
                companyList: {
                    ...this.state.companyList,
                    [parsedResponse.companyKey]: {
                        ...this.state.companyList[parsedResponse.companyKey],
                        partTypes: {
                            ...this.state.companyList[parsedResponse.companyKey].partTypes,
                            [parsedResponse.type]: parsedResponse.data
                        }
                    }
                },
                createProduct: false,
                message: `Succesfully Uploaded Parts for ${parsedResponse.company}`
            });
            

        }catch(err){
            console.log(err);
        }

    }

    getTheParts = async (params) => {
        try{
            if(this.state.companyList[params.companyKey].partTypes[params.type].length > 0){

                const stringURL = `http://localhost:9000/parts/browse/${params.companyKey}/${params.type}`;
                const response = await fetch(stringURL);

                if(!response.ok){
                    throw Error(response.statusText);
                }

                const parsedResponse = await response.json();    

                this.setState({
                    companyList: {
                        ...this.state.companyList,
                        [params.companyKey]: {
                            ...this.state.companyList[params.companyKey],
                            partTypes: {
                                ...this.state.companyList[params.companyKey].partTypes,
                                [params.type]: parsedResponse.data
                            }
                        }
                    },
                    partsList: parsedResponse.data
                })
            }else {
                console.log('THEY ARE SAVED!!! GOTTA MAKE THAT NOW');
                this.setState({
                    partsList: this.state.companyList[params.companyKey].partTypes[params.type]
                });
            }

        }catch(err){
            console.log(err);
        }
    }

    render(){
        return(
            <div>
                {this.state.message}
                {this.state.createProduct ? <CreateProduct closeForm={this.closeForm} upload={this.upload} companyList={this.state.companyList} companyHTML={this.state.companyHTML}/> : <button onClick={this.createButton}>UPLOAD CSV</button> }
                {this.state.showProducts ? <ProductList partsList={this.state.partsList} closeForm={this.closeForm} getTheParts={this.getTheParts} companyList={this.state.companyList} companyHTML={this.state.companyHTML}/> : <button onClick={this.showListButton}>Browse Parts</button>}
            </div>

        )
    }
}

export default ProductContainer;