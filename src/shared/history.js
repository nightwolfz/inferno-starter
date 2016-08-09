import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import useQueries from 'history/lib/useQueries';

export default useQueries(process.env.BROWSER ? createBrowserHistory : createMemoryHistory)()
