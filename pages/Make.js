import React from "react";
import {Grid, Text, Input, Button, Image} from "../elements/paper"
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/Post";
import { actionCreators as imageActions } from "../redux/modules/Image";
import { history } from "../redux/configureStore";

const Make = (props) => {
    const dispatch = useDispatch();
    const [layout, setLay] = React.useState("");
    const preview = useSelector((state)=> state.image.preview);
    const post_list = useSelector((state) => state.post.list);

    const is_login = useSelector((state)=> state.user.is_login);

    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false;

    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
    const [content,setCon] = React.useState(_post ? _post.content : "");

    React.useEffect(() => {
        if(is_edit && !_post){
            console.log("포스트 정보 없음");
            history.goBack();

            return;
        }

        if(!is_edit){
            dispatch(imageActions.setPreview(""))
            return;
        }

        if(is_edit){
            dispatch(imageActions.setPreview(_post.image_src));
        }
    },[])

    const setlayout = (e) =>{
        setLay(e.target.innerHTML)
    }

    const addpost = () => {
        if(preview === "" || content === ''){
            return;
        }
        dispatch(postActions.addPostFB(content,layout))
    }
    const editpost = () => {
        if(preview === "" || content === ''){
            return;
        }
        dispatch(postActions.editPostFB(post_id,{content: content, layout:layout}))
    }

    if(!is_login){
        return(
            <Grid margin="100px 0px" padding="16px" center>
                <Text size="32px" bold>앗 잠깐!</Text>
                <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
                <Button bg="#ffcd48" _onClick={()=>{history.replace('/login')}}>로그인 하러가기</Button>
            </Grid>
        )
    }


    return(
        <Grid bg="#fbf8f0" padding="16px">
        <Grid bg="#fbf8bf" width="60%" margin="32px auto" border padding="16px" is_flex is_column>
            <Grid is_flex padding="10px">
                <Button out bg="#ffcd48" _onClick={setlayout} width="80px">left</Button>
                <Button out bg="#ffcd48" _onClick={setlayout} width="80px">center</Button>
                <Button out bg="#ffcd48" _onClick={setlayout} width="80px">right</Button>
            </Grid>
            <Upload />
            <Grid is_flex is_column margin="10px 0 0 0  ">
                <Image src={preview ? preview : "http://via.placeholder.com/400x300"} shape="rectangle"/>
                <Input area label="게시글 입력" value={content} _onChange={(e)=>{setCon(e.target.value)}} placeholder="내용을 넣어주세요"/>
            </Grid>
            {!is_edit ? (<Button bg="#ffcd48" _onClick={addpost}>게시</Button>
            ) : (
                <Button bg="#ffcd48" _onClick={editpost}>수정</Button>
            )}
        </Grid>
        </Grid>
    )
}

export default Make;