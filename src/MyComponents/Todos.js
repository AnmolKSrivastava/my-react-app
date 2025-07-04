import React from 'react'
import TodoItem from './Todoitem'

const Todos = (props) => {
    const todos = props.todos || [];
    return (
        <div className="container">
            <h3 className="text-center my-3">Todos List</h3>
            {todos.length === 0 ? (
                <p className="text-center">No Todos to display</p>
            ) : (
                todos.map((todo) => {
                    return <TodoItem todo={todo} key={todo.sno} onDelete={() => props.onDelete(todo)}/>
                })
            )}
        </div>
    )
}

export default Todos
