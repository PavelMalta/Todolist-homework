import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import './App.css';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, odoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListsID: string) => void
    addTask: (title: string, odoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, odoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListsID: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return;
        }
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle("")
    }
    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id)
    const removeTodoList =  () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}><input type="checkbox"
                                                  checked={t.isDone}
                                                  onChange={onChangeHandler}
                            />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x
                                </button>
                            </li>)
                    })
                }

            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>

        </div>
    )
}