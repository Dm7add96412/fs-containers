import React from 'react'
import SingleTodo from './components/SingleTodo'

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
        <SingleTodo onClickComplete={onClickComplete} onClickDelete={onClickDelete} key={todo.text} todo={todo}/>
      ).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
