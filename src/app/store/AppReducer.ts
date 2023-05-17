
const initialState: AppStateType = {
    status: 'pending'
}
export const AppReducer = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type){
        case "SET-APPSTATUS": {
            return {...state,status: action.payload.status}
        }
        default: return state;
    }

};

/************AC***************/
export const setAppStatusAC = (status: AppStatusType) => {
    return {type: 'SET-APPSTATUS', payload: {status}} as const
}
type AppStateActionTypes =
    | ReturnType<typeof setAppStatusAC>
export type AppStateType = {
    status: AppStatusType
}
type AppStatusType = 'loading' | 'pending' | 'idle'

