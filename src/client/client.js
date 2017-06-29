// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import 'isomorphic-fetch'
import '../../core/polyfills'
import '../../core/logger'
import '../assets/css/index.scss'
import onEnter from '../../core/onEnter'
import Inferno from 'inferno'
import { Router, match } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory';
import autorun from './autorun'
import stores from './stores'
import routes from './routes'
import Index from '../pages/Index'

// We render our react app into this element
const container = document.getElementById('container')
window.browserHistory = createBrowserHistory()

// React to changes
autorun(stores)

// Fetch data on route change
window.browserHistory.listen(location => {
    onEnter(match(routes, location), stores)
})

/**
 * Render our component according to our routes
 */
Inferno.render(<Index stores={stores}>
    <Router history={window.browserHistory}>
        {routes}
    </Router>
</Index>, container)


if (process.env.NODE_ENV !== 'development') {
    /**
     * Cache assets if browser supports serviceworker
     */
    if ('serviceWorker' in navigator) {
      // Delay registration until after the page has loaded, to ensure that our
      // precaching requests don't degrade the first visit experience.
      // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
      window.addEventListener('load', function() {
        // Your service-worker.js *must* be located at the top-level directory relative to your site.
        // It won't be able to control pages unless it's located at the same level or higher than them.
        // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
        // See https://github.com/slightlyoff/ServiceWorker/issues/468
        navigator.serviceWorker.register('/service.js').then(function(reg) {
          // updatefound is fired if service-worker.js changes.
          reg.onupdatefound = function() {
            // The updatefound event implies that reg.installing is set; see
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = reg.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    // At this point, the old content will have been purged and the fresh content will
                    // have been added to the cache.
                    // It's the perfect time to display a "New content is available; please refresh."
                    // message in the page's interface.
                    console.log('New or updated content is available.');
                  } else {
                    // At this point, everything has been precached.
                    // It's the perfect time to display a "Content is cached for offline use." message.
                    console.log('Content is now available offline!');
                  }
                  break;

                case 'redundant':
                  console.error('The installing service worker became redundant.');
                  break;
              }
            };
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
      });
    }
}

/**
 * Enable hot reloading if available
 */
if (module.hot) {
  module.hot.accept(function() {
    renderApp()
  })
}
