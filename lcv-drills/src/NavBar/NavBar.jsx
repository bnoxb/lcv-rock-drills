import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import styled from 'styled-components';

const Navbar = styled.nav`
    background: #B83200;
    color: #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a { 
        color: white;
        text-decoration: none;

        :hover {
            color: black;
        }
    }
`;

const Brand = styled.a`
    font-weight: bold;
    margin-left: 1rem;
    padding-right: 1rem;
    font-size: 30px;
`;

const LinkList = styled.ul`
    display: flex;
    flex-wrap: nowrap;
`;

const LinkItem = styled.li`
    flex: 0 0 auto;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    color: #999;
    height: 100%;
    justify-content: center;
    text-decoration: none;
    display: flex;
    font-size: 14px;
    height: 50px;
    justify-content: center;
    line-height: 16px;
    margin: 0 10px;
    white-space: nowrap;
`;

class NavBar extends Component {
    constructor(){
        super();

    }
    render(){
        return(
            <Navbar>
                <Brand >
                    <Link to="/">
                        L.C. Vought Company
                    </Link>
                </Brand>
                <LinkList>
                    <LinkItem><Link to="/about" >ABOUT</Link></LinkItem>
                    <LinkItem><Link to="/products" >Products</Link></LinkItem>
                    <LinkItem><Link to="/" >LA CASA</Link></LinkItem>
                </LinkList>
            </Navbar>
        )
    }
}

export default NavBar;