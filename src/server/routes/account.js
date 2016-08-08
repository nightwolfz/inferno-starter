import { Router } from 'express'
import { registerAccount, loginAccount, updateAccount } from '../actions/account'
import authorize from '../middleware/authorize'
import db from '../helpers/database'
const router = Router();

router.post('/api/account/login', async(req, res) => {
    const { username, password } = req.body
    const auth = await loginAccount(username, password)
    if (!auth) {
        return res.status(400).send('Wrong credentials')
    }
    return res.json(auth)
})

router.get('/api/account/logout', async(req, res) => {
    if (!req.token) {
        return res.json(false)
    }
    const user = await db.account
                         .findOneAndUpdate({ token: req.token }, { token: null })
                         .lean() // clear in db
    res.json(user)
})

router.post('/api/account/register', async(req, res) => {
    const { username, password } = req.body
    const exists = await db.account.count({ username })
    if (exists) return res.status(400).send('Username already taken')

    const auth = await registerAccount(username, password)
    res.json(auth)
})

router.post('/api/account/update', authorize, async(req, res) => {
    const updated = await updateAccount(req.body.body, req.body.file, req.token)
    if (!updated) return res.status(400).send('Username already taken')
    res.json(updated)
})

export default router
