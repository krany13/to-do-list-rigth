import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {ChangeTodolistFilterActionType, todolistsReducer} from "./todolists-reducer";

test("correct todolist should be removed", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    let endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId1})

    expect(endState.length ).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = "New TodoList"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    let endState = todolistsReducer(startState, {type: "ADD-TODOLIST", title: newTodoListTitle})

    expect(endState.length ).toBe(3)

    expect(endState[2].title).toBe(newTodoListTitle)
})

test("correct todolist should change its name", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = "New TodoList"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action = {
        type: "CHANGE-TODOLIST-TITLE" as const,
        id: todolistId2,
        title: newTodoListTitle

    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title ).toBe("What to learn")

    expect(endState[1].title).toBe(newTodoListTitle)


})

test("correct filter of todolist should changed", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType  = "Completed"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action : ChangeTodolistFilterActionType = {
        type: "CHANGE-TODOLIST-FILTER" as const ,
        id: todolistId2,
        filter: newFilter

    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter ).toBe("All")

    expect(endState[1].filter).toBe(newFilter)


})
