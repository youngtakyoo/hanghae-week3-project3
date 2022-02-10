import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment"

import { actionCreators as likeActions } from "./Like";
import { actionCreators as imageActions } from "./Image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DEL_POST = "DEL_POST";

const setPost = createAction(SET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post)=>({post}))
const editPost = createAction(EDIT_POST, (post_id,post)=>({post_id, post}))
const delPost = createAction(DEL_POST,(post_id)=>({post_id}))

const initialState = {
    list: [],
}

const initialPost = {
    img_url: "https://www.jungle.co.kr/image/ea06cd0346fa8777cb624e3f",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    layout: "right",
}

const getPostFB = () => {
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post")

        postDB
        .get()
        .then(docs => {
            let post_list = [];

            // 분배 시작
            docs.forEach((doc)=>{
                let _post = doc.data();

                let post = Object.keys(_post).reduce((acc, cur)=>{

                    if(cur.indexOf("user_") !== -1){
                        return {...acc, user_info: {...acc.user_info, [cur]: _post[cur]}};
                    }
                    return {...acc, [cur]: _post[cur]};
                },{id: doc.id, user_info:{}});
                post_list.push(post);
            });
            // 분배 끝
            dispatch(setPost(post_list));
        })
    }
}

const addPostFB = (content="",layout) =>{
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post")
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile
        };

        const _post = {
            ...initialPost,
            content: content,
            layout: layout,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };

        const _image = getState().image.preview;

        const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, "data_url");
   
        _upload.then(snapshot =>{
            snapshot.ref.getDownloadURL().then(url => {
                return url
            }).then(url =>{
                postDB.add({...user_info,..._post,image_src: url,}).then((doc)=>{
                    let post = {
                        user_info,
                        ..._post,
                        id: doc.id,
                        image_src: url,
                    };
                    dispatch(likeActions.addLikeFB(doc.id));
                    dispatch(addPost(post));
                    history.replace('/');

                    dispatch(imageActions.setPreview(null));
                }).catch((err)=>{
                    window.alert("문제발생");
                    console.log("post 작성실패", err);
                });
            }).catch((err)=> {
                window.alert("문제발생");
                console.log("앗! 이미지 업로드에 문제가 있어요",err);
            })
        });
    }
}

const editPostFB = (post_id=null,post={}) =>{
    return function(dispatch, getState,{history}){
        
        if(!post_id){
            console.log("게시물 정보가 없어요");
            return;
        }

        const _image = getState().image.preview;
        const _post_index = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_index];

        const postDB = firestore.collection("post");

        if(_image === _post.image_src){
            postDB.doc(post_id).update(post).then(doc => {dispatch(editPost(post_id,{...post}));
            history.replace('/');
            });
            return;
        }else{
            const user_id = getState().user.user.uid;
            const _upload = storage.ref(`images/${user_id}_${new Date().getTime()}`)
            .putString(_image, "data_url");

            _upload.then(snapshot =>{
            snapshot.ref.getDownloadURL().then(url => {
                return url
            }).then(url =>{
                postDB
                .doc(post_id)
                .update({...post, image_src: url})
                .then(doc => {
                    dispatch(editPost(post_id,{...post,image_src: url}));
                    history.replace('/');
                });
            }).catch((err)=> {
                window.alert("문제발생");
                console.log("앗! 이미지 업로드에 문제가 있어요",err);
            })
        });
        }
    }
}

const delPostFB = (post_id) => {
    return function(dispatch, getState, {history}){
        let postDB = firestore.collection('post');

        postDB.doc(post_id)
        .delete()
        .then(()=>{
            dispatch(delPost(post_id));
        }).catch((err)=>{
            console.log('삭제오류',err)
        })
    }
}

// reducer
export default handleActions({
    [SET_POST]:(state,action)=>produce(state,(draft)=>{
        draft.list.push(...action.payload.post_list);

        draft.list = draft.list.reduce((acc,cur)=>{
            if(acc.findIndex(a => a.id === cur.id) === -1){
                return [...acc,cur];
            }else{
                acc[acc.findIndex(a => a.id === cur.id)] = cur;
                return acc;
            }
        },[]);

    }),
    [ADD_POST]: (state, action) => produce(state, (draft)=>{
        draft.list.unshift(action.payload.post);
    }),
    [DEL_POST]: (state, action) => produce(state, (draft)=>{
        draft.list = draft.list.filter((p)=>action.payload.post_id !== p.id)
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft)=>{
        let idx = draft.list.findIndex((p)=> p.id === action.payload.post_id);
        draft.list[idx] = {...draft.list[idx], ...action.payload.post};
    }),
},initialState)

const actionCreators = {
    setPost,
    addPost,
    editPost,
    delPost,
    getPostFB,
    addPostFB,
    editPostFB,
    delPostFB
};

export {actionCreators};