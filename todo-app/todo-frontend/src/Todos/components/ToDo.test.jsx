import { render, screen } from '@testing-library/react'
import ToDo from './ToDo'

test('renders content', () => {

  const onClickDelete = vi.fn()
  const onClickComplete = vi.fn()

  const todo = {
    text: 'Component testing is done with react-testing-library',
    done: true
  }

  render(<ToDo onClickComplete={onClickComplete} onClickDelete={onClickDelete} key={todo.text} todo={todo}/>)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})