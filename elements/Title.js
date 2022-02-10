import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Title = (props) => {
    const {width, children} = props;

    const styles = {
        width: width,
    }
    return(
        <Tle onClick={()=>{
            history.push('/')
        }} {...styles}>{children}</Tle>
    )
}

Title.defaultProps = {
    width: "10%",
    children: '',
}

const Tle = styled.div`
    width: ${(props)=> props.width};
    background-color: #ffcd48;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
    border: dashed 8px #fdb203; 
    cursor: pointer;
`

export default Title;