import React from "react";
import styled from "styled-components";

const Image = (props) => {
    const {shape, src, size, _onClick} = props;

    const styles = {
        shape: shape,
        src: src,
        size: size,
    }

    if(shape === "circle"){
        return (
            <Circle {...styles}></Circle>
        )
    }
    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner onClick={_onClick} {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

Image.defaultProps = {
    shape: "circle",
    src: "https://cdn.pixabay.com/photo/2018/05/17/06/22/dog-3407906__480.jpg",
    size: 36,
    _onClick: ()=>{},
};

const AspectOutter = styled.div`
    width: 100%;
    max-width: 400px;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;

const Circle = styled.div`
    --size: ${(props)=>props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`

export default Image;