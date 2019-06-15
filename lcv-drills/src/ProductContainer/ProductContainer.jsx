import React, { Component } from 'react';
import CreateProduct from './CreateProduct/CreateProduct';
import ProductList from './ProductList/ProductList';
import SearchProducts from './SearchProducts/SearchProducts';
import { ShowProduct } from './ShowProduct/ShowProduct';
import styled from 'styled-components';



class ProductContainer extends Component {
    constructor(){
        super();
        this.state = {
            createProduct: false,
            showProducts: false,
            showSearch: false,
            message: "",
            parts: [],

            showTypes: false,
            showParts: false,
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
            companyNames: [],
            typeNames: [],
            companyHTML: null,
            typeHTML: null,

            selectedCompanyAndType: {
                company: "",
                type: ""
            },

            search: {
                part: {},
            },
            isLoading: false
        }
    }

    componentDidMount(){
        this.setCompanies();
    }

    searchButton = () => {
        this.setState({
            createProduct: false,
            showProducts: false,
            showSearch: true,
            message: ""
        });
    }

    createButton = () => {
        this.setState({
            createProduct: true,
            showProducts: false,
            showSearch: false,
            message: ""
        });
    }

    showListButton = () => {
        this.setState({
            createProduct: false,
            showSearch: false,
            showProducts: true,
            message: ""
        });
    }

    closeForm = (e) => {
        this.setState({
            [e.target.name]: false,
            showParts: false,
            isLoading: false
        })
    }

    setPartTypes = (company) => {
        const typeNames = Object.keys(this.state.companyList[company].partTypes);
        const types = typeNames.map((type, i)=>{
            return(
                <option key={i} value={type}>{type}</option>
            )
        });

        this.setState({
            typeHTML: types,
            showTypes: true,
            typeNames: typeNames
        });
    }

    setCompanies = () => {
        const companyNames = [];
        const companies = Object.keys(this.state.companyList).map((company, i)=>{
            companyNames.push(this.state.companyList[company].stringName);
            return(
                <li key={i}>
                    <RadioLabel>
                        <Radio type="radio" value={company} onChange={this.handleClick} />
                        {this.state.companyList[company].stringName}
                    </RadioLabel>
                </li>
            )
        });
        this.setState({
            companyHTML: companies,
            companyNames: companyNames
        })
    }

    getCompanyName = (companyKey) => {
        return this.state.companyList[companyKey].stringName;
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

    toggleShowParts = () => {
        this.setState({
            showParts: false
        })
    }

    getTheParts = async (params) => {
        try{
            console.log(this.state);
            // checks to see if the selected parts have already been fetched, if not then get them from the db
            if(this.state.companyList[params.companyKey].partTypes[params.type].length < 1){
                const stringURL = `http://localhost:9000/parts/browse/${params.companyKey}/${params.type}`;
                const response = await fetch(stringURL);

                if(!response.ok){
                    throw Error(response.statusText);
                }

                const parsedResponse = await response.json();
                // store the fetched parts in companyList then set them to partsList to be displayed
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
                    parts: parsedResponse.data,
                    selectedCompanyAndType: {
                        company: params.company,
                        type: params.type
                    },
                    showParts: true,
                    isLoading: false
                })
            }else {
                // set the 
                this.setState({
                    parts: this.state.companyList[params.companyKey].partTypes[params.type],
                    showParts: true,
                    selectedCompanyAndType: {
                        company: params.company,
                        type: params.type
                    },
                    isLoading: false
                });
            }

        }catch(err){
            console.log(err);
        }
    }

    handleSearch = async (reqNum) => {
        try{
            const response = await fetch('http://localhost:9000/parts/search/' + reqNum);
            if(!response.ok){
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();

            this.setState({
                search: {
                    part: parsedResponse.data,
                    showPart: true,
                },
                isLoading: false
            });
        }catch(err){
            console.log(err);
        }
    }


    handleLoading = () => {
        this.setState({
            isLoading: true
        })
    }

    render(){
        return(
            <div>
                {this.state.message}
                {this.state.createProduct ? <CreateProduct 
                                                closeForm={this.closeForm} 
                                                upload={this.upload} 
                                                companyList={this.state.companyList} 
                                                companyHTML={this.state.companyHTML}
                                                handleLoading={this.handleLoading} /> 
                                            : <button onClick={this.createButton}>UPLOAD CSV</button> }

                {this.state.showProducts ? <ProductList 
                                                partsList={this.state.parts} 
                                                closeForm={this.closeForm} 
                                                selectedInfo={this.state.selectedCompanyAndType}
                                                getTheParts={this.getTheParts} 
                                                getCompanyName={this.getCompanyName}
                                                companyHTML={this.state.companyHTML} 
                                                typeHTML={this.state.typeHTML}
                                                showParts={this.state.showParts}
                                                showTypes={this.state.showTypes}
                                                toggleShowParts={this.toggleShowParts}
                                                toggleShowTypes={this.toggleShowTypes}
                                                setPartTypes={this.setPartTypes}
                                                handleLoading={this.handleLoading} /> 
                                            : <button onClick={this.showListButton}>Browse Parts</button>}

                {this.state.showSearch ? <SearchProducts 
                                                closeForm={this.closeForm}
                                                handleLoading={this.handleLoading}
                                                part={this.state.search.part} 
                                                showPart={this.state.search.showPart}
                                                closeShowPart={this.closeShowPart}
                                                handleSearch={this.handleSearch} /> 
                                            : <button onClick={this.searchButton}>Search Parts</button>}

                { this.state.search.showPart ? <ShowProduct part={this.state.search.part} /> : null }

                { this.state.isLoading ? <h1>LOADINGG</h1> : null}

            </div>

        )
    }
}


const RadioLabel = styled.label`
    display: inline-block;
    backgroud-color:#ddd;
    padding: 10px 20px;
    font-family: Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
    &:hover {
        background-color:#dfd;
    }
   
`

const Radio = styled.input`
    display: none;
    &:checked + ${RadioLabel}{
        background-color:#bfb;
        border-color:#4c4;
    }
`

export default ProductContainer;