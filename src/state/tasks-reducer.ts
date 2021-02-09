import {FilterValuesType, TasksStateType, TodoListType} from "../App";
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
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string

}


type ActionsType = removeTaskActionType | AddTaskActionType | ChangeTaskStatusActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListID];
            let task = tasks.find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;
            }
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
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todoListID
    }
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID,
        isDone,
        todoListID
    }
}
