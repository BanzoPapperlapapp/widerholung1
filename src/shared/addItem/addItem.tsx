import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
type AddItemPropsType = {
    fullWidth: boolean
    addItem: (title: string) => void
    subTitle: string
}
export const AddItem = ({fullWidth = false, subTitle, addItem}:AddItemPropsType) => {
    const [title,setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if( e.key === 'Enter') {
            if(title) {
                addItem(title);
                setTitle('')
            } else {
                setError('Введите текст')
            }
        }
    }
    return (
        <TextField
            value={title}
            error={!!error}
            helperText={error}
            id="outlined-basic"
            label={subTitle}
            variant="outlined"
            fullWidth={fullWidth}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
        />
    );
};
