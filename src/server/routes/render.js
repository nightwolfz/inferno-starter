import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerRouter } from 'react-router'
import createServerRenderContext from 'react-router/createServerRenderContext'
import preload from '../../client/preload'
import Html from '../../client/components/Common/Html'

// Server-side render
export default async(ctx, next) => {

    const renderContext = createServerRenderContext()

    function renderComponent() {
        return preload(ctx.stores).then(() => {
            return <ServerRouter location={ctx.url} context={renderContext}>
                <Html stores={ctx.stores}/>
            </ServerRouter>
        })
    }

    function sendResponse(statusCode, output) {
        ctx.status = statusCode
        ctx.body = '<!DOCTYPE html>\n' + output
    }

    const result = renderContext.getResult()

    // Handle redirects
    if (result.redirect) {
        ctx.status = 301
        ctx.redirect(result.redirect.pathname)
        ctx.body = '<!DOCTYPE html>\n' + 'redirecting'
        return await next()
    }

    // 404 Route not found !
    if (result.missed) {
        const markup = await renderComponent()
        sendResponse(404, markup)
    } else {
        const markup = await renderComponent()
        sendResponse(200, renderToStaticMarkup(markup))
    }
}
