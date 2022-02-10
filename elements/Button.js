import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Button = (props) => {
    const {text, _onClick, width, bg, color, children, 
        is_float, head, edit} = props;
     
    const styles = {
        width:width,
        bg: bg,
        color: color,
        head: head,
        edit: edit,
        
    };
    if(is_float){
        return(<Float onClick={()=>{history.push('/make')}} >{children}</Float>)
    }
    

    return (
        <Btn {...styles} onClick={_onClick}>{children}</Btn>
    )
};

Button.defaultProps = {
    text: "text",
    _onClick: ()=>{},
    width: "100%",
    bg: "#212121",
    color: "#fff", 
    margin: false,
    children: null,
    is_float: false,
    head: false,
    edit: false,
};

const Btn = styled.button`
    width: ${(props)=>props.width};
    max-width: 200px;
    box-sizing: border-box;
    padding: 12px 0;
    border: none;
    box-sizing: border-box;
    background-color: ${(props)=>props.bg};
    color: ${(props)=>props.color};
    ${(props)=> props.margin ? `margin:${props.margin}`:""}
    ${(props)=> props.head ? `border: solid 5px #fdb203;`:""}
    ${(props)=> props.edit ? `border-top: solid 3px #000; border-bottom: solid 3px #000;`:""}
    &: focus{
        outline: dashed 5px #fdb203;
    }
`;

const Float = styled.button`
    width: 50px;
    height: 50px;
    background-color: #ffcd48;
    font-size: 24px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 32px;
    border: none;
    border-top: 5px solid black;
    border-bottom: 5px solid black;
    cursor: pointer;
`

export default Button;