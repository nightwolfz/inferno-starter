import { Router } from 'express'
import { registerAccount, loginAccount } from '../actions/account'
import authorize from '../middleware/authorize'
import error from '../helpers/error'
import db from '../helpers/database'
const router = Router();

router.post('/api/account/login', async(req, res) => {
    const { username, password } = req.body
    const auth = await loginAccount(username, password)
    if (!auth) {
        return error(res, 'Wrong credentials')
    }
    return res.json(auth)
})

router.get('/api/account/logout', async(req, res) => {
    const user = await db.account
                         .findOneAndUpdate({ token: req.token }, { token: null })
                         .lean() // clear in db
    res.json(user)
})

router.post('/api/account/register', async(req, res) => {
    const { username, password } = req.body
    const exists = await db.account.count({ username })

    if (exists) {
        return error(res, 'Username already taken')
    } else {
        const auth = await registerAccount(username, password)
        res.json(auth)
    }
})

router.post('/api/account/update', authorize, async(req, res) => {
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

    const user = await db.account.findOneAndUpdate({ token: req.token }, { $set: query }, { new: true }).lean()

    res.json({
        username: user.username,
        description: user.description,
        picture: user.picture
    })
})

export default router
