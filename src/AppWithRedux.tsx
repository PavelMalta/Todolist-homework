import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {Button, Container, Grid,Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";
import {removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "All" | "Completed" | "Active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('App is called')
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>( state => state.todoLists);
    const tasksObj = useSelector<AppRootState, TasksStateType>( state => state.tasks);

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID)
        dispatch(action)
    }
    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID)
        dispatch(action)
    }
    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = changeTodoListFilterAC(todoListID, value)
        dispatch(action)
    }
    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }
    function changeTodoListTitle(id: string, newTitle: string) {
        const action = changeTodoListTitleAC(id, newTitle)
        dispatch(action)
    }
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    },[])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <Menu/>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <Paper elevation={3} style={{margin:"10px", padding: "10px"}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Paper>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === "Completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === "Active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }
                            return <Grid item>
                                <Paper elevation={3} style={{padding: "20px"}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeStatus}
                                          filter={tl.filter}
                                          removeTodoList={removeTodoList}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodoListTitle={changeTodoListTitle}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
