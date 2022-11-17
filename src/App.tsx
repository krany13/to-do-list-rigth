import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

export type FilterValuesType = "All" | "Completed" | "Active"

function App() {
    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("All")

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeTask = (id: number) => {
        tasks = tasks.filter((el) => {
            return el.id !== id
        })
        setTasks(tasks)
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
            <Todolist title={"Прикольчики"}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
