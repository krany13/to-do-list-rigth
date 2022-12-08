import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';

export type FilterValuesType = "All" | "Completed" | "Active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskPropsType>
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
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(el => el.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todolist = todoLists.find(el => el.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todoLists])
        }
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
            {id: todoListId1, title: "What to learn", filter: "All"},
            {id: todoListId2, title: "What to buy", filter: "All"}
        ]
    )

    let removeTodoList = (todoListId: string) => {
        let filteredTodolist = todoLists.filter(el => el.id !== todoListId)
        setTodoList(filteredTodolist)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
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

    const addTodoList = (title: string) => {
        let todolists: TodoListType = {
            id: v1(),
            filter: "All",
            title: title
        }
        setTodoList([todolists, ...todoLists])
        setTasks({...tasksObj, [todolists.id]: []})
    }

    return (
        <div className={"App"}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={7}>
                    {
                        todoLists.map((el) => {
                            let tasksForToDoList = tasksObj[el.id]
                            if (el.filter === "Completed") {
                                tasksForToDoList = tasksForToDoList.filter((el) => el.isDone === true)
                            }
                            if (el.filter === "Active") {
                                tasksForToDoList = tasksForToDoList.filter((el) => el.isDone === false)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={el.id}
                                        id={el.id}
                                        title={el.title}
                                        tasks={tasksForToDoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={el.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
