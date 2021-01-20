import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListsID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListsID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} color="primary">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                        checked={t.isDone}
                                                                                        onChange={onChangeStatusHandler}
                            />
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler} color="primary">
                                    <Delete/>
                                </IconButton>

                            </li>)
                    })
                }

            </ul>
            <div>
                <Button
                    variant="contained"
                    size={"small"}
                    color={props.filter === "All" ? "primary" : "default"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant="contained"
                    size={"small"}
                    color={props.filter === "Active" ? "primary" : "default"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant="contained"
                    size={"small"}
                    color={props.filter === "Completed" ? "primary" : "default"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>

        </div>
    )
}

