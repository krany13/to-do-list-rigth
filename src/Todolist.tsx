import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type PropsType = {
    title: string,
    tasks: Array<TaskPropsType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onAllClickHandler = () => {
        props.changeFilter("All")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("Active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("Completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    const onRemoveHandler = () => {
                        props.removeTask(el.id)
                    }
                    return (
                        <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
