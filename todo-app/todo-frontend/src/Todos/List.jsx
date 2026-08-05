import React from 'react'
import ToDo from './components/ToDo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => 
        <ToDo onClickComplete={onClickComplete} onClickDelete={onClickDelete} key={todo.text} todo={todo}/>
      ).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
