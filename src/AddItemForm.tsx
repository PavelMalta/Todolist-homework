import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddComment} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return;
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("")
    }

    return (
        <div>
            <TextField  value={newTaskTitle}
                        onChange={onNewTitleChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        error={!!error}
                        variant="outlined"
                        label={"type value"}
                        helperText={error}
            />
            <IconButton color="primary" onClick={addTask}>
               <AddComment/>
            </IconButton>

        </div>
    )
});