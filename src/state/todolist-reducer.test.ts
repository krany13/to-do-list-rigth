import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = "New TodoList"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    let endState = todolistsReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3)

    expect(endState[2].title).toBe(newTodoListTitle)
})

test("correct todolist should change its name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = "New TodoList"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action = ChangeTodolistTitleAC(todolistId2, newTodoListTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")

    expect(endState[1].title).toBe(newTodoListTitle)


})

test("correct filter of todolist should changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = "Completed"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action = ChangeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("All")

    expect(endState[1].filter).toBe(newFilter)


})
