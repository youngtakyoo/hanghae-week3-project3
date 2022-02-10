import React from "react";

import { Button } from "../elements/paper";
import { storage } from "./firebase";

import {useDispatch, useSelector} from "react-redux"
import { actionCreators as imageAtions } from "../redux/modules/Image";

const Upload = (porops) => {
    const fileInput = React.useRef();
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);

    const selectFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            dispatch(imageAtions.setPreview(reader.result));
        };
    };
    return(
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
        </React.Fragment>
    )
}

export default Upload;