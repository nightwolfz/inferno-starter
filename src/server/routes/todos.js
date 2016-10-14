import router from 'koa-router'
import authorize from '../middleware/authorize'
import db from '../helpers/database'
import _ from 'lodash'
import { getAccount } from './account'

export default router()
.get('/api/todos', getTodos)
.post('/api/todos/add', authorize, addTodos)
.post('/api/todos/remove', authorize, removeTodos)

async function getTodos(ctx) {
    const response = await db.todos.find({
        createdBy: await getAccount(ctx.token)
    }).limit(50).exec()

    ctx.body = response
}

async function addTodos(ctx) {
    const { text } = ctx.request.fields

    if (_.isEmpty(text)) throw new Error('[text] not provided')

    const newTodo = new db.todos({
        text,
        createdBy: await getAccount(ctx.token)
    })
    const response = await newTodo.save()

    ctx.body = response
}

async function removeTodos(ctx) {
    const { _id } = ctx.request.fields

    if (_.isEmpty(_id)) throw new Error('[_id] not provided')

    const response = await db.todos.remove({ _id })

    ctx.body = response
}
