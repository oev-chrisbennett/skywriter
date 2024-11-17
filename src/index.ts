import { AtpAgent } from '@atproto/api'
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

type Bindings = {
    BLUESKY_USERNAME: string
    BLUESKY_PASSWORD: string
    BEARER_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

const agent = new AtpAgent({
    service: 'https://bsky.social',
})

app.use('*', (c, next) => {
    if (!c.env.BEARER_TOKEN) return next()
    return bearerAuth({ token: c.env.BEARER_TOKEN })(c, next)
})

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.get('/send', async (c) => {
    await agent.login({
        identifier: c.env.BLUESKY_USERNAME,
        password: c.env.BLUESKY_PASSWORD,
    })

    const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const message = `The time is now ${now}`

    const post = await agent.post({
        text: `<DEBUG> Hello from Hono! ${message}`,
    })

    return c.json(post)
})

export default app
