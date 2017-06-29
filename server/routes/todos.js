import Todo from '../models/Todo'
import { getAccount } from './account'

export async function getTodos(ctx) {
  const response = await Todo.find({
    createdBy: await getAccount(ctx.token)
  }).limit(50).exec()

  ctx.body = response
}

export async function addTodos(ctx) {
  const { text } = ctx.request.fields

  if (!text) throw new Exception('[text] not provided')

  const newTodo = new Todo({
    text,
    createdBy: await getAccount(ctx.token)
  })
  const response = await newTodo.save()

  ctx.body = response
}

export async function removeTodos(ctx) {
  const { _id } = ctx.request.fields

  if (!_id) throw new Exception('[_id] not provided')

  const response = await Todo.remove({ _id })

  ctx.body = response ? { success: true } : { success: false }
}
