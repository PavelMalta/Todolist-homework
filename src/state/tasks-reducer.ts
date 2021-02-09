import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";

export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string,
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}


type ActionsType = removeTaskActionType | AddTaskActionType


export const tasksReducer = (state: TaskStateType, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todoListID];
            const filteredTask = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListID] = filteredTask
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListID];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListID] = newTasks;
            return stateCopy
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
export const addTaskAC = (title: string, todoListID: string):AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListID
    }
}
