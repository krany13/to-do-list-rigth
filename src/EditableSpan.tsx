import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string)=> void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = ()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = ()=> {
        setEditMode(false)
        props.onChange(title)
    }

    const OnChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input autoFocus onBlur={activateViewMode} onChange={OnChangeTitleHandler} value={title}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}