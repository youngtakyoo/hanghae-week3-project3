import React from "react";
import { useHistory } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/User";

import { Grid, Button, Text, Title } from "../elements/paper"
const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const is_login = useSelector((state) => state.user.is_login);
    const user_info = useSelector((state) => state.user.user);

    const logout = () =>{
        dispatch(userAction.logoutFB());
    }

    if(is_login){
     return(
        <React.Fragment>
            <Grid bg="#fcffb0" is_flex padding="16px">
                    <Title >XoXo망고</Title>
                    <Text bold margin="0" size="24px">당신 : {user_info.user_name}</Text>
                    <Button head color="#111" width="150px" _onClick={logout} bg="#ffcd48">logout</Button>
            </Grid>
        </React.Fragment>
     )   
    }

    return (
        <React.Fragment>
            <Grid bg="#fcffb0" is_flex padding="16px">
                <Grid is_flex>
                    <Title >XoXo망고</Title>
                    <Button head color="#111" width="150px" _onClick={()=>{
                        history.push("/login/signin")
                    }} bg="#ffcd48" >로그인</Button>
                </Grid>
                    <Button head color="#111" width="150px" _onClick={()=>{
                        history.push("/login/signup")
                    }} bg="#ffcd48" >회원가입</Button>
            </Grid>
        </React.Fragment>
    )
}

export default Header;