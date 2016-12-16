import router from 'koa-router'
import authorize from '../middleware/authorize'
import Todo from '../models/Todo'
import { getAccount } from './account'

export default router()
.get('/api/todos', authorize, getTodos)
.post('/api/todos/add', authorize, addTodos)
.post('/api/todos/remove', authorize, removeTodos)

async function getTodos(ctx) {
    const response = await Todo.find({
        createdBy: await getAccount(ctx.token)
    }).limit(50).exec()

    ctx.body = response
}

async function addTodos(ctx) {
    const { text } = ctx.request.fields

    if (!text) throw new TypeError('[text] not provided')

    const newTodo = new Todo({
        text,
        createdBy: await getAccount(ctx.token)
    })
    const response = await newTodo.save()

    ctx.body = response
}

async function removeTodos(ctx) {
    const { _id } = ctx.request.fields

    if (!_id) throw new TypeError('[_id] not provided')

    const response = await Todo.remove({ _id })

    ctx.body = response ? _id : false
}
