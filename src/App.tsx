import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ])

    const removeTask = (id: number) => {
        tasks = tasks.filter((el) => {
            return el.id !== id
        })
        setTasks(tasks)
    }


    return (
        <div className={"App"}>
            <Todolist title={"Прикольчики"}
                      tasks={tasks}
                      removeTask={removeTask}/>
        </div>
    )
}

export default App;
