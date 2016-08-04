import _ from 'lodash'
import { Router } from 'express'
import db from '../helpers/database'
const router = Router();

router.get('/api/todos', async(req, res) => {
    const body = await db.todos.find({}).limit(100).exec()
    res.json(body)
})

router.post('/api/todos/add', async(req, res) => {
    if (_.isEmpty(req.body.text)) return res.status(400).send('[text] not provided')

    const todo = new db.todos({
        text: req.body.text
    })
    const result = await todo.save()
    return res.json(result)
})

router.post('/api/todos/remove', async(req, res) => {
    if (_.isEmpty(req.body._id)) return res.status(400).send('[_id] not provided')

    const result = await db.todos.remove({ _id: req.body._id })
    return res.json(result)
})


/**
 * Remove weird characters and trim space
 * @private
 * @param str
 * @returns {string}
 */
function cleanString(str) {
    return str.toLowerCase()
              .replace(/\W+|–/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
}

export default router
