import React, { Fragment, useEffect, useState } from 'react';
import { SELECTED_ACTION } from '../common-constants/const';
import AddTodo from '../components/AddTodo/AddTodo';
import TodoCard from '../components/TodoCard/TodoCard';
import './MainContainer.scss';
import axios from 'axios';

function MainContainer() {

    const [activeAction, setActiveAction] = useState(SELECTED_ACTION.MY_TODO);
    const [allTodos, setAllTodos] = useState([]);
    const hostName = 'http://localhost:8080';

    useEffect(() => {
        if (activeAction === SELECTED_ACTION.MY_TODO) {
            handleAllTodoGet();
        }
    }, [activeAction])

    const handleAllTodoGet = () => {
        axios.get(`${hostName}/getAllTodos`).then((res) => {
            console.log("res in get api", res.data);
            setAllTodos(res.data);
        })
    }

    const handleCancelAddTodo = () => {
        setActiveAction(SELECTED_ACTION.MY_TODO);
    }

    const handleConfirmAddTodo = (data) => {
        console.log('add was clicked with data', data);
        axios.post(`${hostName}/addTask`, data).then((res) => {
            console.log("res in get api", res.data);

        })
        setActiveAction(SELECTED_ACTION.MY_TODO);
    }

    const handleDeleteTodo = (id) => {
        const data = {
            id: id
        }
        axios.post(`${hostName}/deleteTask`, data).then((res) => {
            console.log("res in delete api", res.data);
            handleAllTodoGet();
        }).catch((err) => {
            console.log(err)
            alert("Error in deleting");
        })
    }

    const handleEditSaveTodo = (data) => {
        console.log('save clicked with data', data);
        axios.post(`${hostName}/updateTask`, { ...data }).then((res) => {
            console.log("res in delete api", res.data);
            handleAllTodoGet();

        }).catch((err) => {
            console.log(err)
            alert('Error in updation!!!');
        })
    }

    return (
        <div className='main-container'>
            <div className='add-view-btn'>
                <div className={activeAction === SELECTED_ACTION.ADD_TODO ? 'add-todo-btn common-btn green' : 'add-todo-btn common-btn'} onClick={() => setActiveAction(SELECTED_ACTION.ADD_TODO)}>Add Todo</div>
                <div className={activeAction === SELECTED_ACTION.MY_TODO ? 'view-todos-btn common-btn green' : 'view-todos-btn common-btn'} onClick={() => setActiveAction(SELECTED_ACTION.MY_TODO)}>My Todos</div>
            </div>
            <>
                {activeAction === SELECTED_ACTION.MY_TODO ?
                    <>
                        {allTodos && allTodos.length > 0 &&
                            allTodos.map((todo) =>
                                <Fragment key={todo._id}>
                                    <TodoCard
                                        data={todo}
                                        handleDeleteTodo={() => handleDeleteTodo(todo._id)}
                                        handleEditSaveTodo={(data) => handleEditSaveTodo(data)}
                                    />
                                </Fragment >
                            )}
                    </>
                    :
                    <>
                        <AddTodo handleCancelAddTodo={handleCancelAddTodo} handleConfirmAddTodo={(data) => handleConfirmAddTodo(data)} />
                    </>
                }
            </>
        </div >
    );
}

export default MainContainer;