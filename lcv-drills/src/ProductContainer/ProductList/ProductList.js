import React, { Component } from 'react';
import styled from 'styled-components';

const RadioLabel = styled.label`
    display: flex;
    backgroud-color:#ddd;
    padding: 10px 20px;
    font-family: Arial;
    font-size: 16px;
    border-radius: 1rem;
    color: white;
    &:hover {
        background-color:#F99058;
        color: black;
    }
    
`

const Radio = styled.input`
    display: none;
    &:checked + ${RadioLabel} {
        background-color:#F99058;
        color: black;
    }
`

const Item = styled.div`
    display: flex;
    
`

const Form = styled.form`
    display: flex;
    margin-left: 5rem;
    
`

const Wrapper = styled.div`
    display: flex wrap;
    justify-content: center;
    
    align-items: center;
`



class ProductList extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                companyKey: "none",
                company: "none",
                type: "none"
            },
            companies: null,
            types: null,
            showTypes: false,
            shouldRefresh: false
        }
    }

    componentDidMount(){
        this.setCompanies();
    }

    async componentDidUpdate(){
        if(this.props.shouldRefresh !== this.state.shouldRefresh){
            await this.setState({
                data: {
                    companyKey: "none",
                    company: "none",
                    type: "none"
                },
                types: null,
                showTypes:false,
                shouldRefresh: this.props.shouldRefresh
            });
            this.setCompanies();
        }

        
    }

    handleChangeCompany = async (e) => {
        const company = e.target.value;
        const string = this.props.companyNames[company];

        await this.setState({
            data:{
                ...this.state.data,
                company: string,
                companyKey: company
            },
        });
        this.setCompanies();
        this.props.toggleShowParts();
        this.setPartTypes(this.props.getCompanyTypes(company));
    }

    handleChangeType = async (e) => {
        await this.setState({
            data:{
                ...this.state.data,
                type: e.target.value
            }
        });
        
        this.setPartTypes(this.props.getCompanyTypes(this.state.data.companyKey));

        this.props.toggleShowParts();
        this.props.getTheParts(this.state.data);
        this.props.handleLoading();
    }

    setPartTypes = (typeNames) => {
        const types = typeNames.map((type, i)=>{
            return(
                <Item key={i}>
                        <Radio type="radio" value={type} name="types" id={type} onChange={this.handleChangeType} checked={this.state.data.type === type}/>
                        <RadioLabel htmlFor={type}>{type}</RadioLabel>
                </Item>
            )
        });

        this.setState({
            types,
            showTypes: true,
        });
    }

    setCompanies = () => {
        
        const companies = Object.keys(this.props.companyNames).map((company, i)=>{
            return(
                <Item key={i}>
                        <Radio type="radio" value={company} name="companies" id={company} onChange={this.handleChangeCompany} checked={this.state.data.companyKey === company}/>
                        <RadioLabel htmlFor={company}>{this.props.companyNames[company]}</RadioLabel>
                </Item>
                    
            )
        });
        this.setState({
            companies,
        })
    }

    render(){
        
        return(
            <Wrapper>
                {/* <form>
                    <label>
                        Company:
                        <select disabled={this.state.isDisabled} name="company" onChange={this.handleChangeCompany} value={this.state.data.companyKey} >
                            <option value="none">Select Company</option>
                            {this.props.companyHTML}
                        </select>
                    </label>
                    {this.props.showTypes ? <label>
                                                Type:
                                                <select name="type" onChange={this.handleChangeType} value={this.state.data.type} >
                                                    <option value="none">Select Category</option>
                                                    {this.props.typeHTML}
                                                </select>
                                            </label> 
                                            : null}
                    <button name="showProducts" onClick={this.props.closeForm.bind(this)}>Close Product List Form</button>
                </form> */}

                <Form>
                    {this.state.companies}
                </Form>
                {this.state.showTypes ? <Form>
                                            {this.state.types}
                                        </Form>
                                        : null}
            </Wrapper>
        )
    }
}




export default ProductList;