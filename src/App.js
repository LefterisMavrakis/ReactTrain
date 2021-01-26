import './App.css';
import Nav from "./components/Nav";
import About from "./components/About";
import Shop from "./components/Shop";
import ItemDetails from "./components/ItemDetails";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
     <Router>
         <div className="App">
             <Nav/>
             <Switch>
                 <Route path="/" exact component={Home}/>
                 <Route path="/about" exact component={About}/>
                 <Route path="/shop" exact component={Shop}/>
                 <Route path="/shop/:id" component={ItemDetails}/>
             </Switch>
         </div>
     </Router>

  );
}

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default App;
