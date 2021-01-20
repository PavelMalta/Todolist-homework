import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "All" | "Completed" | "Active"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType ={
    [key:string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListID] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListID]
        let newTasks = [task, ...tasks]
        tasksObj[todoListID] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    function removeTodoList(todoListID: string) {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListID]
        setTasks({...tasksObj})
    }

    let todoListID1 = v1();
    let todoListID2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "Active"},
        {id: todoListID2, title: "What to buy", filter: "Completed"}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
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

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "All"
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasksObj,
            [todoList.id]:[]
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === "Completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "Active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
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
                                     removeTodoList={removeTodoList}
                    />
                })
            }


        </div>
    );
}

export default App;
