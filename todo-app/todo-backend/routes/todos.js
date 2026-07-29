const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todos = await redis.get("added_todos")
  if (todos) {
    await redis.set("added_todos", Number(todos) + 1)
  } else {
    await redis.set("added_todos", Number(1))
  }

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

/* GET todos metadata */
router.get('/statistics', async (_, res) => {
  const todos = await redis.get("added_todos")
  res.send({ added_todos: todos ?? 0 })
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo
  const body = req.body

  if (!body) return res.status(404).json({ error: 'No body in request' })

  todo.text = body.text ?? todo.text
  todo.done = body.done ?? todo.done

  await todo.save()
  res.send(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
