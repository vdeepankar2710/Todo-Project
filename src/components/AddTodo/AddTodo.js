import React, { useState } from 'react';
import './AddTodo.scss';
function AddTodo(props) {
    const [headingTodo, setHeadingTodo] = useState("")
    const [descriptionTodo, setDescriptionTodo] = useState("");

    const handleConfirmAdd = () => {
        const data = {
            heading: headingTodo,
            description: descriptionTodo,
        }
        props.handleConfirmAddTodo(data);

    }

    const handleCancelAdd = () => {
        props.handleCancelAddTodo();
    }

    return (
        <div className='add-todo-container'>
            <div className='add-header'>Add Todo::</div>
            <div className='heading-input'>
                <label className='label-heading' htmlFor='heading-todo'>About</label>
                <input
                    type='text'
                    placeholder='Add a heading'
                    className='heading-todo'
                    id='heading-todo'
                    onChange={(event) => setHeadingTodo(event.target.value)}
                />
            </div>
            <div className='description-input'>
                <label className='label-desc' htmlFor='desc-todo'>Description</label>
                <input
                    type='textarea'
                    placeholder='Add a description'
                    className='desc-todo'
                    id='desc-todo'
                    onChange={(event) => setDescriptionTodo(event.target.value)}
                />
            </div>
            <div className='add-todo-btn'>
                <div className='common-btn' onClick={handleConfirmAdd}>Confirm Add</div>
                <div className='common-btn' onClick={handleCancelAdd}>Cancel</div>
            </div>
        </div>
    );
}

export default AddTodo;