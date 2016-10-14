import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
//import useQueries from 'history/lib/useQueries';

export default process.env.BROWSER ? createBrowserHistory() : createMemoryHistory()
