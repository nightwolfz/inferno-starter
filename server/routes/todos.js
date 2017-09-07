import Todo from '../models/Todo'

export async function getTodos(ctx) {

  if (!ctx.account.id) {
    ctx.body = []
    return
  }

  const response = await Todo.find({
    createdBy: ctx.account
  }).limit(50).exec()

  ctx.body = response
}

export async function addTodos(ctx) {
  const { fields } = ctx.request

  if (!fields.text) throw new Exception('[text] not provided')

  const newTodo = new Todo({
    text: fields.text,
    createdBy: ctx.account
  })
  const response = await newTodo.save()

  ctx.body = response
}

export async function removeTodos(ctx) {
  const { fields } = ctx.request

  if (!fields.id) throw new Exception('[id] not provided')

  const response = await Todo.remove({ _id: fields.id })

  ctx.body = response ? { success: true } : { success: false }
}
