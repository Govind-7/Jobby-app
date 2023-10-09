import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Protected from './components/Protected'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Protected exact path="/" component={Home} />
    <Protected exact path="/jobs" component={Jobs} />
    <Protected exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
