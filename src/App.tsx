import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Completed" | "Active"

function App() {
    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("All")

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    const removeTask = (id: string) => {
        tasks = tasks.filter((el) => {
            return el.id !== id
        })
        setTasks(tasks)
    }

    const addTask = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let tasksForToDoList = tasks
    if (filter === "Completed") {
        tasksForToDoList = tasks.filter((el) => el.isDone === true)
    }
    if (filter === "Active") {
        tasksForToDoList = tasks.filter((el) => el.isDone === false)
    }

    return (
        <div className={"App"}>
            <Todolist title={"To-Do List"}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;
