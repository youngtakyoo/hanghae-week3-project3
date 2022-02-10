import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";

import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING,(uploading)=>({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE,(image_url)=>({image_url}));
const setPreview = createAction(SET_PREVIEW,(preview)=>({preview}));

const initialState = {
    image_url: '',
    uploading: false,
    preview: null,
}
// reducer
export default handleActions({
    [SET_PREVIEW]:(state,action) => produce(state, (draft)=>{
        draft.preview = action.payload.preview;
    }),
    [UPLOADING]:(state,action) => produce(state, (draft)=>{
        draft.uploading = action.payload.uploading;
    }),
},initialState);

const actionCreators = {
    uploadImage,
    setPreview,
}

export {actionCreators}