import React from 'react';
import {FilterValuesType} from "./App";

export type PropsType = {
    title: string,
    tasks: Array<TaskPropsType>,
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValuesType) => void
}

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => {props.removeTask(el.id)}}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("All")}}>All</button>
                <button onClick={() => {props.changeFilter("Active")}}>Active</button>
                <button onClick={() => {props.changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    );
};
