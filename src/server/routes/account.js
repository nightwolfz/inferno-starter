import { Router } from 'express'
import { registerAction, loginAction } from '../actions/account'
import error from '../helpers/error'
import db from '../helpers/database'
const router = Router();

router.post('/api/account/login', async(req, res) => {
    const { username, password } = req.body
    const user = await loginAction(username, password, req.session.id)
    if (!user) {
        return error(res, 'Wrong credentials')
    }
    return res.json(user)
})

router.get('/api/account/logout', async(req, res) => {
    const user = await db.account
                         .findOneAndUpdate({ session: req.session.id }, { session: null })
                         .lean() // clear in db

    req.session.destroy() // clear session
    res.json(user)
})

router.post('/api/account/register', async(req, res) => {
    const { username, password } = req.body
    console.log({ username, password })
    const exists = await db.account.count({ username })
    if (exists) {
        return error(res, 'Username already taken')
    } else {
        const user = await registerAction(username, password)
        res.json(user)
    }
})

router.post('/api/account/update', async(req, res) => {
    const { body, file } = req.body
    const query = {}
    const userExists = await db.account.findOne({ username: body.username }, '_id').lean()
    if (userExists) return error(res, 'Username already taken')

    if (body.username) {
        query['username'] = body.username
    }
    if (body.description) {
        query['description'] = body.description
    }

    const user = await db.account.findOneAndUpdate({ session: req.session.id }, { $set: query }, { new: true }).lean()

    res.json({
        username: user.username,
        description: user.description,
        picture: user.picture
    })
})

export default router
