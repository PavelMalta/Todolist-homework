import React, {useReducer} from 'react';
import {v1} from 'uuid';
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
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";

export type FilterValuesType = "All" | "Completed" | "Active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID1 = v1();
    let todoListID2 = v1();
    let [todoLists, dispatchToTodoListReducer] = useReducer(todoListsReducer,[
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"}
    ])
    let [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer,{
        [todoListID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "car", isDone: false},
            {id: v1(), title: "bus", isDone: true},
        ]
    })

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID)
        dispatchToTaskReducer(action)
    }
    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID)
        dispatchToTaskReducer(action)
    }
    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatchToTaskReducer(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatchToTaskReducer(action)
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = changeTodoListFilterAC(todoListID, value)
        dispatchToTodoListReducer(action)
    }
    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatchToTodoListReducer(action)
        dispatchToTaskReducer(action)
    }
    function changeTodoListTitle(id: string, newTitle: string) {
        const action = changeTodoListTitleAC(id, newTitle)
        dispatchToTodoListReducer(action)
    }
    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTodoListReducer(action)
        dispatchToTaskReducer(action)
    }

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
                    <Paper elevation={3} style={{margin:"10px", padding: "10px"}}><AddItemForm addItem={addTodoList}/></Paper>
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

export default AppWithReducers;
