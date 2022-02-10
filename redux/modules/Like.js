import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

const SET_LIKE = "SET_LIKE";
const LIKE_PUSH = "LIKE_PUSH";

const setLike = createAction(SET_LIKE,(like_list)=>({like_list}));
const likePush = createAction(LIKE_PUSH,(post_id,user_id)=>({post_id,user_id}));

const initialState = {
    list:[],
}

const setLikeFB = () => {
    return function(dispatch, getState, {history}){
        let likeDB = firestore.collection("like");

        likeDB.get()
        .then(docs=>{
            let like_list = [];

            docs.forEach((doc)=>{
                like_list.push({...doc.data(),id: doc.id})
            })

            dispatch(setLike(like_list))

        })
        .catch((err)=>{console.log("좋아요 오류 발생",err)});
    }
}

const addLikeFB = (post_id) => {
    return function(dispatch, getState, {history}){
        let likeFB = firestore.collection("like");

        likeFB.add({post_id: post_id,liked_user:[]}).then((doc)=>{
            console.log(doc)
            dispatch(setLike([{post_id: post_id,liked_user:[]}]))
        })
        .catch(err=>{console.log("오류 좋아요 객체 추가", err)})
    }
}

const pushLikeFB = (like_id) => {
    return function(dispatch, getState, {history}){
        let likeDB = firestore.collection("like");

        let liked_user = getState().like.list.filter(l => l.id === like_id)[0].liked_user;
        let like_cnt = getState().like.list.filter(l => l.id === like_id)[0].like_cnt
        const post_id = getState().like.list.filter(l => l.id === like_id)[0].post_id;
        const user_id = getState().user.user.uid;

        
        if(liked_user.includes(user_id)){
            console.log("좋아요 취소")

            liked_user = liked_user.filter(l => user_id !== l);
            like_cnt = like_cnt - 1;

            likeDB.doc(like_id).set({
                post_id: post_id,
                liked_user: [...liked_user],
                like_cnt: like_cnt
            }).then(()=>{dispatch(setLikeFB())}).catch(err => console.log('like error',err));
            return;
        }else{
            console.log("좋아요 누름")

            liked_user = [...liked_user,user_id]
            like_cnt = like_cnt + 1;
            
            likeDB.doc(like_id).set({
                post_id: post_id,
                liked_user: [...liked_user],
                like_cnt: like_cnt
            }).then(()=>{dispatch(setLikeFB())}).catch(err => console.log('like error',err));

        }

    }
}

export default handleActions({
    [SET_LIKE]:(state,action)=>produce(state,(draft)=>{
        draft.list = [...draft.list, ...action.payload.like_list];
    }),
    [LIKE_PUSH]:(state,action)=>produce(state,(draft)=>{
        let index = draft.list.findIndex((l) => l.post_id === action.payload.post_id);
        draft.list[index].liked_user.push(action.payload.user_id)
    }),
},initialState)

const actionCreators = {
    setLike,
    likePush,
    setLikeFB,
    addLikeFB,
    pushLikeFB
};

export {actionCreators};