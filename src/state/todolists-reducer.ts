import {TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "All"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }

        default:
            throw new Error("I don't understand this action type")
    }
}