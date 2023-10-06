const initialState = {
    userLoginId: 0,
}

export const userLoginIdReducer = (state = initialState, action) => {
    if (action.type == "ADD_USER_LOGIN_ID"){
        const newuserLoginId : number = action.payload
        return {
            ...state,
            userLoginId: newuserLoginId
        }
    }
    return state
}

