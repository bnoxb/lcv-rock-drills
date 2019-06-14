import React from 'react';

export const ShowProduct = (props) => {
    return(
        <div>
            <h1>{props.part.company}</h1>
            <h2>{props.part.type}</h2>
            <h4> ~ {props.part.part_number} ~ {props.part.new_part_number ? props.part.new_part_number :  null}</h4>
            <p> CALL US TO ORDER THIS PART!!!!</p>
        </div>
    )
}

