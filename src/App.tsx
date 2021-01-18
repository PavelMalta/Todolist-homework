import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "All" | "Completed" | "Active"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>("All")

    function removeTask (id: string) {
        let filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks)
    }
    function changeFilter (value: FilterValuesType) {
        setFilter(value)
    }
    function addTask (title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    function changeStatus (taskID: string, isDone: boolean) {
        let task = tasks.find( t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    let tasksForTodolist = tasks;
    if(filter === "Completed") {
        tasksForTodolist = tasks.filter( t => t.isDone === true)
    }
    if(filter === "Active") {
        tasksForTodolist = tasks.filter( t => t.isDone === false)
    }

  return (
    <div className="App">

      <Todolist title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
      />

    </div>
  );
}

export default App;
