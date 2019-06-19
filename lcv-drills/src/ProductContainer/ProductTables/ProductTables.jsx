import React, { Component } from 'react';
import styled from 'styled-components';
import './style.css';

const Table = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const PartGroup = styled.div`
    width: 25%;
    display: block;
    margin-bottom: 1rem;
    
`

const Part = styled.div`
    padding: .25rem;
    color: green;
`

const Row = styled.div`
    display: flex;
    width: 100vw;
    border-top: solid .5rem black;
`

const RowContainer = styled.div`

`

const ColHeader = styled.div`
    border-bottom: solid .25rem black;
    font-size: 1.5rem;
    background: white;
`

const TableHeader1 = styled.div`
    font-size: 3rem;
`

const TableHeader2 = styled.div`
    font-size: 1.75rem;
    margin-bottom: 1rem;
`

const Wrapper = styled.div`

`


class ProductTables extends Component {
    constructor(){
        super();
        this.state = {
            sortedParts: [],
            theParts: null,
            colComm: {
                0: "firstCol",
                1: "secondCol",
                2: "thirdCol",
                3: "lastCol"
            }
        }
    }

    componentDidMount= () => {
        this.sortColumns();
    }

    sortColumns = async () => {
        const denom = 75;
        const rounds = Math.ceil(this.props.partsList.length / denom);
        let lastIndex = 0;
        const sortedParts = [];
        let row = [];
        // organize groups in groups of denom size
        for( let i = 0; i < rounds; i++){
            let col = [];
            // Set batch size in case theres less than denom left in the group
            const batchSize = (this.props.partsList.length - lastIndex < denom) ? this.props.partsList.length - lastIndex : denom;

            // loop through the parts and put in group array
            for (let i = lastIndex; i < lastIndex + batchSize; i++){
                if(col){
                    col.push(this.props.partsList[i]);
                }
            }
            // set the new starting point for next group
            lastIndex += 1 + denom;

            // organize rows with 4 groups in each row
            if(col.length > 0 && row.length < 4){
                row.push(col);
            }else if (row.length === 4){
                sortedParts.push(row);
                row = [];
                if(col.length > 0 ){
                    row.push(col);
                }
            }
        }
        // straggler rows
        if(row.length > 0){
            sortedParts.push(row);
        }
        await this.setState({
            sortedParts: sortedParts
        });
        this.renderSortedParts();
    }

    renderSortedParts = () => {
        const theParts = this.state.sortedParts.map((row, i) => {

            const theRow = row.map((col, i) => {

                const partsGroup = col.map((part, i)=> {

                    return(
                        <Part key={i}>
                            {part.part_number} - {part.new_part_number}
                        </Part>
                    )
                });

                return(
                    <PartGroup key={i} className={this.state.colComm[i]}>
                        <ColHeader>Part Number</ColHeader>
                        {partsGroup}
                    </PartGroup>
                )
            });

            return(
                <RowContainer key={i}>
                    <TableHeader1>{this.props.selectedInfo.company}</TableHeader1>
                    <TableHeader2>{this.props.selectedInfo.type}</TableHeader2>
                    <Row >
                        {theRow}
                    </Row>
                </RowContainer>
            )
        });
        
        this.setState({
            theParts
        });
    }

    render(){
        return(
            <Wrapper>
                <Table>
                    {this.state.theParts}
                </Table>
            </Wrapper>
        )
    }

};

export default ProductTables;