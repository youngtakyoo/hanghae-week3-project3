import React from "react";
import Post from "../components/Post";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post";
import { actionCreators as likeActions } from "../redux/modules/Like";

import { Grid } from "../elements/paper"

const Main = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);
    const like_list = useSelector(state => state.like.list);
    const user_info = useSelector((state)=> state.user.user);

    React.useEffect(()=>{
        if(post_list == 0 || like_list == 0){
            dispatch(postActions.getPostFB())
            dispatch(likeActions.setLikeFB())
        }
    },[])


    return(
        <React.Fragment >
            <Grid margin="auto" padding="16px" bg="#fbf8f0">
            {post_list.map((p)=>{
                if(p.user_info.user_id === user_info?.uid){
                    return <Post key={p.id} {...p} is_me />
                }else{
                    return <Post key={p.id} {...p}/>
                }
                
            })}
            </Grid>
        </React.Fragment>
    )
}

export default Main;