import React from "react";
import styled from "styled-components"

const Grid = (props) => {
    const {is_flex, is_column, width, margin, padding, bg, children, border} = props;

    const styles = {
        is_flex: is_flex,
        width: width,
        padding: padding,
        margin: margin,
        bg: bg,
        is_column: is_column,
        border: border,
    }
    return(
        <React.Fragment>
            <GridBox {...styles}>
                {children}
            </GridBox>
        </React.Fragment>
    )
}

Grid.defaultProps = {
    children:null,
    is_flex: false,
    flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
    is_column: false,
    border: false,
}

const GridBox = styled.div`
    width: ${(props)=>props.width};
    height: 100%;
    box-sizing: border-box;
    ${(props) => props.border ? `border-top: 5px solid #ffcd48;border-bottom: 3px solid #ffcd48;border-radius: 16px;`:""}
    ${(props) => props.padding ? `padding: ${props.padding};` : ""}
    ${(props) => props.margin ? `margin: ${props.margin};` : ""}
    ${(props) => props.bg ? `background-color: ${props.bg};` : ""}
    ${(props) => props.is_flex ? `display:flex; align-items: center; justify-content: space-between;` : ""}
    ${(props) => props.is_column ? `flex-direction: column;` : ""}
    ${(props) => props.flex ? `display:flex; flex-direction: row;`: ''}
`

export default Grid;