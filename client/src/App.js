import react,{Fragment} from 'react';
import Navbar from './components/layouts/Navbar'
import {BrowserRouter as Router,Routes,Route, Switch} from 'react-router-dom';
import Landing from './components/layouts/Landing'
import Login from './auth/Login'
import Register from './auth/Register';
//redux
import {Provider} from 'react-redux';
import store from './store';


const App =()=>{
  return(
    <Provider store={store}>
  <Router>
  <Fragment>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route className='container' path='/login' element={<Login/>} />  
    <Route className='container' path='/register' element={<Register/>} />
    </Routes>
  </Fragment>
  </Router>
  </Provider>
)
}


export default App;
