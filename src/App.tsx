import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "All" | "Completed" | "Active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todoList = todoLists.find(el => el.id === todolistId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
            {id: todoListId1, title: "What to learn", filter: "Active"},
            {id: todoListId2, title: "What to buy", filter: "Completed"}
        ]
    )

    let removeTodoList = (todoListId: string) => {
        let filteredTodolist = todoLists.filter(el => el.id !== todoListId)
        setTodoList(filteredTodolist)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true}
        ]
    })


    return (
        <div className={"App"}>
            <AddItemForm addTask={()=>{}} id={"wre"}/>
            {
                todoLists.map((el) => {
                    let tasksForToDoList = tasksObj[el.id]
                    if (el.filter === "Completed") {
                        tasksForToDoList = tasksForToDoList.filter((el) => el.isDone === true)
                    }
                    if (el.filter === "Active") {
                        tasksForToDoList = tasksForToDoList.filter((el) => el.isDone === false)
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
                        removeTodoList={removeTodoList}
                    />
                })
            }

        </div>
    )
}

export default App;
