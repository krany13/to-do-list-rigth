import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Completed" | "Active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todoList = todoLists.find(el => el.id === todolistId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
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


    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
            {id: v1(), title: "What to learn", filter: "Active"},
            {id: v1(), title: "What to buy", filter: "Completed"}
        ]
    )

    return (
        <div className={"App"}>
            {
                todoLists.map((el) => {
                    let tasksForToDoList = tasks
                    if (el.filter === "Completed") {
                        tasksForToDoList = tasks.filter((el) => el.isDone === true)
                    }
                    if (el.filter === "Active") {
                        tasksForToDoList = tasks.filter((el) => el.isDone === false)
                    }
                    return <Todolist
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />
                })
            }

        </div>
    )
}

export default App;
