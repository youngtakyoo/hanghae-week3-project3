import React from "react";
import { Grid, Text, Image, Button, Like } from "../elements/paper"
import { history } from "../redux/configureStore";

import { useDispatch,useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post";

const Post = (props) => {
    const dispatch = useDispatch(); 

    const delpost = () =>{
        dispatch(postActions.delPostFB(props.id));
    }
    
    if(props.layout  === "right"){
        return (
            <Grid bg="#fbf8bf" padding="16px" width="50%" margin="24px auto 24px" border>
                <Grid is_flex>
                <Grid >
                    <Image />
                </Grid>
                <Grid is_flex>
                    <Text>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                    {props.is_me && 
                        <Button 
                        edit
                        width="30px" 
                        margin="4px" 
                        padding="4px"
                        bg="#ffcd48"
                        color="#111"
                        _onClick={()=>{
                            history.push(`/make/${props.id}`)
                        }} 
                        >E</Button>}
                    {props.is_me && 
                        <Button 
                        edit
                        width="30px" 
                        margin="4px" 
                        padding="4px"
                        bg="#ffcd48"
                        color="#111"
                        _onClick={delpost}
                        >D</Button>}
                </Grid>
            </Grid>
                <Grid is_flex>
                    <Grid is_flex>
                        <Text>
                            {props.content}
                        </Text>
                    </Grid>
                    <Image src={props.image_src} shape="rectangle"/>
                </Grid>
                    
                <Grid is_flex>
                    <Like post_id={props.id}/>
                </Grid>
            </Grid>
        )
    }

    if(props.layout === "left"){
        return (
            <Grid bg="#fbf8bf" padding="16px" width="50%" margin="24px auto 24px" border>
                <Grid is_flex>
                <Grid >
                    <Image />
                </Grid>
                <Grid is_flex>
                    <Text>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                    {props.is_me && 
                        <Button 
                        edit
                        width="30px" 
                        margin="4px" 
                        padding="4px"
                        bg="#ffcd48"
                        color="#111"
                        _onClick={()=>{
                            history.push(`/make/${props.id}`)
                        }} 
                        >E</Button>}
                    {props.is_me && 
                        <Button 
                        edit
                        width="30px" 
                        margin="4px" 
                        padding="4px"
                        bg="#ffcd48"
                        color="#111"
                        _onClick={delpost}
                        >D</Button>}
                </Grid>
            </Grid>
                <Grid is_flex>
                    <Grid is_flex>
                        <Image src={props.image_src} shape="rectangle"/>
                        <Text>
                            {props.content}
                        </Text>
                    </Grid>
                    
                </Grid>
                <Grid is_flex>
                    <Like post_id={props.id}/>
                </Grid>
            </Grid>
        )
    }


    return (
        <Grid bg="#fbf8bf" padding="16px" width="50%" margin="24px auto 24px" border>
            <Grid is_flex>
                <Grid >
                    <Image />
                </Grid>
                <Grid is_flex>
                    <Text>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                    {props.is_me && 
                        <Button 
                        edit
                        width="30px" 
                        margin="4px" 
                        padding="4px"
                        bg="#ffcd48"
                        color="#111"
                        _onClick={()=>{
                            history.push(`/make/${props.id}`)
                        }} 
                        >E</Button>}
                    {props.is_me && 
                        <Button 
                        edit
                        width="30px" 
                        margin="4px" 
                        padding="4px"
                        bg="#ffcd48"
                        color="#111"
                        _onClick={delpost}
                        >D</Button>}
                </Grid>
            </Grid>
            <Grid is_flex is_column>
                <Grid>
                    <Text>
                        {props.content}
                    </Text>
                </Grid>
                <Image src={props.image_src} shape="rectangle"/>
                
            </Grid>
            <Grid is_flex>
                <Like post_id={props.id}/>
            </Grid>
        </Grid>
    )
}

Post.defaultProps = {
    user_propfile: "",
    image_src: "https://post-phinf.pstatic.net/MjAyMTA0MTJfMjkw/MDAxNjE4MjMxNDk4Mjg0.XhooNOw8J9DsctWoHOyAw7EpQv1XZ3eQGcJEMpTVIZMg.mnJFYVFpRpn98aXT5bhX3-H-yIYSj7caPM0VZKhcUeEg.JPEG/IMG_2370.jpg?type=w1200",
    comment_cnt: 5,
    content: "내용입니다.",
    insert_dt: "2020-09-09 19:00:00",
    user_name: "bean",
    layout: "left",
}

export default Post;