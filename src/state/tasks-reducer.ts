import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionType1 = {
    type: '1'
    id: string
}
export type ActionType2 = {
    type: '2'
    title: string
}


type ActionsType = ActionType1 | ActionType2


export const tasksReducer = (state: TaskStateType, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case '1': {
            return {...state}
        }
        case '2': {
            return {...state}
        }

        default:
            throw new Error("I don't understand this action type")
    }
}

export const action1AC = (todoListID: string): ActionType1 => {
    return {
        type: '1',
        id: todoListID
    }
}
export const action2AC = (title: string):ActionType2 => {
    return {
        type: '2',
        title: title
    }
}
