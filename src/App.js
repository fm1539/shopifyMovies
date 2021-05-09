import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import Homepage from './components/Homepage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
