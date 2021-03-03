import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')
    const onAllClickHandler = useCallback(() => props.changeFilter("All", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("Active", props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("Completed", props.id), [props.changeFilter, props.id])

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodolist = props.tasks;

    if (props.filter === "Completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }
    if (props.filter === "Active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
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
            <div>
                {
                    tasksForTodolist.map(t => <Task
                            key={t.id}
                            task={t}
                            todolistId={props.id}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    )
                }

            </div>
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
})

