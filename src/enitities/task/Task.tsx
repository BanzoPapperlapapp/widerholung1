import React, {memo} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
type TaskPropsType = {
    id: string
    title: string
    completed: boolean
    changeTaskStatus: (taskId: string, status: boolean) => void
    delTask: (taskId: string) => void
}
export const Task = memo(({id, title, completed, changeTaskStatus, delTask} : TaskPropsType) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => delTask(id)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined}  dense onClick={() => changeTaskStatus(id, !completed)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={completed}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={title}/>
            </ListItemButton>
        </ListItem>
    );
}
)