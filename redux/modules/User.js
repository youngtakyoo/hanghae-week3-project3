import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { getCookie, deleteCookie, setCookie } from "../../shared/cookie";

import {auth} from "../../shared/firebase";
import firebase from "firebase/app";

// action
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

// actionCreators
const logOut = createAction(LOG_OUT, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}))

// initialstate
const initialState = {
    user: {uid: "notid"},
    is_login: false,
};

// middlewares
const loginFB = (id,pw) => {
    return function(dispatch, getState, {history}){
        auth
        .setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res)=>{        
            auth
            .signInWithEmailAndPassword(id, pw)
            .then((userCredential) =>{
                const user = userCredential.user;
                dispatch(setUser({
                    user_name: user.displayName,
                    id: id,
                    user_profile: "",
                    uid: user.uid,
                    })
                );
                history.push('/')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode,errorMessage);
              });
        })
    }
} 

const loginCheckFB = () => {
    return function(dispatch, getState,{history}){
        auth.onAuthStateChanged((user)=>{
            if(user){
                dispatch(setUser({
                    user_name: user.displayName,
                    user_profile: '',
                    id: user.email,
                    uid: user.uid,}))
            } else {
                dispatch(logOut())
            }
        })
    }
}

const signUpFB = (id,pw,nick) => {
    return function(dispatch, getState, {history}){
        auth
        .createUserWithEmailAndPassword(id, pw)
        .then((userCredential)=>{
            let user = userCredential.user;

            auth.currentUser.updateProfile({displayName: nick})
            .then(()=>{
                dispatch(setUser({
                    user_name: nick,
                    id: id,
                    user_profile: "",
                    uid: user.uid,
                }))
                history.push('/')
            }).catch((error)=>{
                console.log(error);
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode, errorMessage)
          });
    }
}

const logoutFB = () => {
    return function(dispatch, getState, {history}){
        auth.signOut().then(()=>{
            dispatch(logOut());
            history.replace('/');
        })
    }
}

// reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft)=>{
        setCookie("is_login","success");
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft)=>{
        deleteCookie("is_login");
        draft.user = {uid:"not id"};
        draft.is_login = false;
    }),
},initialState)

// actionCreators 만들기
const actionCreators = {
    logOut,
    setUser,
    signUpFB,
    logoutFB,
    loginFB,
    loginCheckFB,
}
export {actionCreators}