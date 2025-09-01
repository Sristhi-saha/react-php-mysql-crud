export const Add = (items)=>{
    return{
        type:"ADD_DATA",
        payload:items
    }
}

export const deleteTodo = (items)=>{
    return{
        type:"DELETE_DATA",
        payload:items
    }
}