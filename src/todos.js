import React from 'react'

const Todos = ({todos, deleteTodo}) =>{
    //check if there's smth to do
    const todoList = todos.length ? (
        todos.map(todo =>{
            return (
                //vuole un id per le cose stampate a ciclo
                <div className="collection-item" key={todo.id}>
                    <span onClick={()=>{deleteTodo(todo.id)}}>{todo.content}</span>
                </div>
            )
        })
    ) : (
        <p className="center"> You don't have any todos</p>
    )
    return(
        <div className="todos collection">
            {todoList}
        </div>
    )
}

export default Todos