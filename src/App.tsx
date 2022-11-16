import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let tasks1 = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    let tasks2 = [
        {id: 1, title: "YO", isDone: true},
        {id: 2, title: "XXX", isDone: true},
        {id: 3, title: "Nike", isDone: false}
    ]
    return (
        <div className={"App"}>
            <Todolist title={"Прикольчики"} tasks={tasks1}/>
            <Todolist title={"Херня"} tasks={tasks2}/>
        </div>
    )
}

export default App;
