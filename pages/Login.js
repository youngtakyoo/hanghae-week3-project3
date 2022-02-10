import React from "react";

import { useParams } from "react-router-dom";
import { useDispatch,useSelctor } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/User";

import { Grid, Text, Button, Input } from "../elements/paper";
import emailCheck from "../shared/Common";

const Login = (props) => {
    const form = useParams().form;
    const dispatch = useDispatch();

    const [id,setId] = React.useState("");
    const [pwd,setPwd] = React.useState("");
    const [nick,setNick] = React.useState("");
    const [pwd_c,setPwdC] = React.useState("");

    const login = () => {
        if(!emailCheck(id)){
            window.alert("이메일 형식이 잘못됐습니다.")
            return;
        }
        if(id === "" || pwd === ""){
            window.alert("공란이 있습니다.")
            return;
        }
        dispatch(userAction.loginFB(id,pwd));
    }
    const signin = () => {
        if(!emailCheck(id)){
            window.alert("이메일 형식이 잘못됐습니다.")
            return;
        }
        if(id === "" || pwd === "" || nick === ""){
            window.alert("공란이 있습니다.")
            return;
        }
        if(pwd !== pwd_c){
            window.alert("비밀번호가 틀렸습니다.")
            return;
        }
        dispatch(userAction.signUpFB(id,pwd,nick))
    }


    if(form === "signup"){
        return (
            <React.Fragment>
            <Grid padding="16px" is_flex is_column width="60%" margin="16px auto">
                <Grid>
                    <Text bold size="36px">회원가입하기</Text>
                    <Input _onChange={(e)=>{setId(e.target.value)}} label="아이디" placeholder="아이디를 입력해주세요." />
                    <Input _onChange={(e)=>{setNick(e.target.value)}} label="닉네임" placeholder="닉네임을 입력해주세요." />
                    <Input type="password" _onChange={(e)=>{setPwd(e.target.value)}} label="비밀번호" placeholder="비밀번호를 입력해주세요."/>
                    <Input type="password" _onChange={(e)=>{setPwdC(e.target.value)}} label="비밀번호 확인" placeholder="비밀번호를 확인해주세요."/>
                </Grid>
                <Grid margin="10px">
                    <Button _onClick={signin} width="200px" >회원가입</Button>
                </Grid>
            </Grid>
        </React.Fragment>
        )
    }
    return(
        <Grid padding="16px" width="60%" margin="32px auto">
            <Grid is_flex is_column padding="16px" >
                <Grid>
                    <Text bold size="36px" >로그인하기</Text>
                    <Input _onChange={(e)=>{setId(e.target.value)}} label="아이디" placeholder="아이디를 입력해주세요." />
                    <Input type="password" _onChange={(e)=>{setPwd(e.target.value)}} label="비밀번호" placeholder="비밀번호를 입력해주세요."/>
                </Grid>
                <Grid margin="10px">
                    <Button _onClick={login} width="200px">로그인</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;