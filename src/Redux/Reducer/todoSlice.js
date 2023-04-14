import { createSlice } from '@reduxjs/toolkit'

const handleRemoveTodo = (item, todos) => {
    const todoIndex = todos.indexOf(item);
    todos.splice(todoIndex, 1);
    return todos;
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.todoList = handleRemoveTodo(action.payload, state.todoList)
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;