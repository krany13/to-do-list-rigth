import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from '@mui/icons-material';
import {Button, Checkbox, IconButton} from "@mui/material";

export type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskPropsType>,
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => {
        props.changeFilter("All", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("Active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("Completed", props.id)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map((el) => {
                    const onRemoveHandler = () => {
                        props.removeTask(el.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(el.id, newValue, props.id)
                    }
                    return (
                        <div className={el.isDone ? "is-done" : ""} key={el.id}><Checkbox color={"secondary"}
                                                                                          onChange={onChangeStatusHandler}
                                                                                          checked={el.isDone}/>
                            <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={props.filter === "All" ? "contained" : "text"} color={"inherit"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === "Active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === "Completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};

