import React, { useState } from 'react';
import './TodoCard.scss';

function TodoCard(props) {
    const [editActive, setEditActive] = useState("");
    const [headingTodo, setHeadingTodo] = useState("");
    const [descriptionTodo, setDescriptionTodo] = useState("");

    const handleEditTodo = (id) => {
        setEditActive(id);
        setHeadingTodo(props.data.heading);
        setDescriptionTodo(props.data.description);
    }

    const handleDeleteTodo = (id) => {
        // api call for deleting the todo
        props.handleDeleteTodo(id)
    }

    const handleEditCancelTodo = (id) => {
        setEditActive("")
        setHeadingTodo(props.data.heading);
        setDescriptionTodo(props.data.description);
    }

    const handleEditSaveTodo = (id) => {
        const data = {
            id: id,
            heading: headingTodo,
            description: descriptionTodo,
        }
        props.handleEditSaveTodo(data);
        setEditActive("")
    }

    return (
        <div className='todo-card-container'>
            <div className='todo-heading'>
                <input
                    type='text'
                    className='todo-head-input'
                    value={editActive === props.data._id ? headingTodo : props.data.heading}
                    onChange={(event) => setHeadingTodo(event.target.value)}
                />
            </div>
            <div className='todo-description'>
                <input
                    type='text'
                    className='todo-desc-input'
                    value={editActive === props.data._id ? descriptionTodo : props.data.description}
                    onChange={(event) => setDescriptionTodo(event.target.value)}
                />
            </div>
            <div className='btn-container'>
                {editActive !== props.data._id ?
                    <>
                        <div className='common-btn edit-btn' onClick={() => handleEditTodo(props.data._id)}>
                            Edit
                        </div>
                        <div className='common-btn delete-btn' onClick={() => handleDeleteTodo(props.data._id)}>
                            Delete
                        </div>
                    </> :
                    <>
                        <div className='common-btn save-edit-btn' onClick={() => handleEditSaveTodo(props.data._id)}>
                            Save
                        </div>
                        <div className='common-btn delete-btn' onClick={() => handleEditCancelTodo(props.data._id)}>
                            Cancel
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default TodoCard;