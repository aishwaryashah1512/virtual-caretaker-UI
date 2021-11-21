
import './App.css';
import reducer from './store/Reducers/ProfileReducer'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import BMICalculater from './bmi/Bmicalc';
import Caloriecounter from './bmi/Caloriecounter'
import './App.css';
import Mainpage from './Mainpage';
import Homepage from './homepage';
import Profile from './Profile/Profile';
// import Profile from './Profile'; 
import Login from './Login';

function App() {
  const store = createStore(reducer)
  return (
    <Provider store={store}>
      <div className="App App-header">
        <BrowserRouter>
          <Route path="/" exact component={Login} />
          <Route path="/bmi" exact component={BMICalculater} />
          <Route path="/cal" exact component={Caloriecounter} />
          <Route path="/mainpage" exact component={Mainpage} />
          <Route path="/homepage" exact component={Homepage} />
          <Route path="/profile" exact component={Profile} />
        </BrowserRouter>
      </div>
    </Provider>

  );
}
export default App;