import React from 'react';
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
    Done: boolean
    onClick: (taskId: string, status: boolean) => void
}
export const Task = ({id, title, Done, onClick} : TaskPropsType) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined}  dense onClick={() => onClick(id, !Done)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={Done}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={title}/>
            </ListItemButton>
        </ListItem>
    );
};