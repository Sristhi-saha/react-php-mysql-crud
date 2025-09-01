const initialState = {
    todos:[]
}
export const todoReducer = (state=initialState,action)=>{
    switch(action.type){
        case "ADD_DATA":
            return{
                ...state,
                todos:[...state.todos,action.payload]
            }
        case "DELETE_DATA":
            return{
                ...state,
                todos:state.todos.filter((todo)=>todo!==action.payload)
            }
        case "UPDATE_DATA":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                todo === action.payload.old ? action.payload.new : todo
                ),
            };
        default:
            return state;
    }
}

//state.todos.filter((todo) => todo !== "Study React")