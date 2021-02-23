import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';
import {
    ActionsType, addTodoListAC,
    changeTodoListFilterAC,
    ChangeTodoListFilterActionType, changeTodoListTitleAC, removeTodoListAC, todoListsReducer
} from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType> = [];

beforeEach( () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
})

test('correct todolist should be removed', () => {
    const action: ActionsType = removeTodoListAC(todolistId1)
    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("All");
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodoListTitleAC(todolistId2,newTodolistTitle)
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "Completed";

    const action: ChangeTodoListFilterActionType = changeTodoListFilterAC(todolistId2, newFilter)
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
