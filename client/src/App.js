import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Login from './Pages/Login'
import Home from './Pages/Home'
import Users from './Pages/User/Users'
import Details from './Pages/User/Details'
import createUser from './Pages/User/CreateUser'
import updateUser from './Pages/User/UpdateUser'
import Jobs from './Pages/Job/Jobs'
import createJob from './Pages/Job/CreateJob'
import updateJob from './Pages/Job/UpdateJob'
import Tasks from './Pages/Task/Tasks'
import createTask from './Pages/Task/CreateTask'
import updateTask from './Pages/Task/UpdateTask'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/user/add" component={createUser} />
          <Route exact path="/user/details/:id" component={Details} />
          <Route exact path="/user/edit/:id" component={updateUser} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/job/add" component={createJob} />
          <Route exact path="/job/edit/:id" component={updateJob} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/task/add" component={createTask} />
          <Route exact path="/task/edit/:id" component={updateTask} />
          <Route render={() => (<Redirect to="/" />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
