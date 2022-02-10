import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid, Text } from "../elements/paper"

import { useDispatch,useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/Like";

const Like = (props) => {
    const list = useSelector(state => state.like.list);
    const is_login = useSelector(state => state.user.is_login);
    let user_id = useSelector(state => state.user.user.uid);
    const dispatch = useDispatch();
    const post_id = props.post_id;

    const my_like = list.filter(l => l.post_id === post_id)[0];
    const like_cnt = my_like?.like_cnt;
    const like_id = my_like?.id;
    

    let is_like = my_like?.liked_user.includes(user_id);
    

    React.useEffect(() => {
        
    }, [is_like])

    const pushlike = () =>{
        if(is_login){
            dispatch(likeActions.pushLikeFB(like_id));
        } else {
            window.alert("로그인 해주세요!!");
            history.push('/login/signin');
        }
    };

    if(is_like){
        return(
        <Grid is_flex>
            <Text>좋아요 {like_cnt}개</Text>
            <IsLike onClick={pushlike}></IsLike>
        </Grid>
        ) 
    }

    return (
        <Grid is_flex>
            <Text>좋아요 {like_cnt}개</Text>
            <NotLike onClick={pushlike} ></NotLike>
        </Grid>
    )
}

Like.defaultProps = {
    _onClick: ()=>{},
    is_like: false,
    like_cnt: 0,
}

const IsLike = styled.button`
    width: 20px;
    height: 20px;
    background-color: #ffcd48;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`;
const NotLike = styled.button`
    width: 20px;
    height: 20px;
    background-color: #d3d3d3;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`;

export default Like;