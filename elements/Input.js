import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./paper"

const Input = (props) => {
    const {label, placeholder, _onChange, area, type, value} = props

    if(area){
        return(
        <Grid>
            <Text>{label}</Text>
            <Area value={value} rows={10} placeholder={placeholder} onChange={_onChange}/>
        </Grid>
        )
    }
    return (
        <React.Fragment>
            <Grid>
                <Text>{label}</Text>
                <Inp type={type} onChange={_onChange} placeholder={placeholder}/>
            </Grid>
        </React.Fragment>
    )
}

Input.defaultProps = {
    label: "입력",
    placeholder: "입력하세요.",
    _onChange: ()=>{},
    type: "text",
    area: false,
    value: '',
};

const Inp = styled.input`
    width: 100%;
    max-width: 300px;
    padding: 12px 4px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ffcd48;
    outline: none;
`;

const Area = styled.textarea`
    border: 1px solid #ffcd48;
    width: 100%;
    padding: 8px 4px;
    box-sizing: border-box;
    outline: none;
`;

export default Input;