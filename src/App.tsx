import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "All" | "Completed" | "Active"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find( tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskID: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: "What to learn", filter: "Active"},
        {id: v1(), title: "What to buy", filter: "Completed"}
    ])

    return (
        <div className="App">

            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasks;
                    if (tl.filter === "Completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "Active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false)
                    }
                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }


        </div>
    );
}

export default App;
