import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";

export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string,
    todoListID: string
}
export type ActionType2 = {
    type: '2'
    title: string
}


type ActionsType = removeTaskActionType | ActionType2


export const tasksReducer = (state: TaskStateType, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todoListID];
            const filteredTask = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListID] = filteredTask
            return stateCopy
        }
        case '2': {
            return {...state}
        }

        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): removeTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListID
    }
}
export const action2AC = (title: string):ActionType2 => {
    return {
        type: '2',
        title: title
    }
}
