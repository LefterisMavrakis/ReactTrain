import './App.css';
import Nav from "./components/Nav";
import About from "./components/About";
import Shop from "./components/Shop";
import ItemDetails from "./components/ItemDetails";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import {CartContextProvider} from "./context/cartContext";
import GlobalContextProvider from "./context/globalContext";

function App() {
    return (
        <Router>
            <GlobalContextProvider>
                <div className="App">
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={About}/>
                        {/*<CartContextProvider>*/}
                        <Route path="/shop" exact component={Shop}/>
                        {/*</CartContextProvider>*/}
                        <Route path="/shop/:id" component={ItemDetails}/>
                    </Switch>
                    <div className={'containerWrapper footer'}>
                        <div className="container">
                            <div className="footerInner">
                                <div className="footerCopyrights">
                                    React Shop &copy;. All rights reserved.
                                </div>
                                <div className="footerCredits">
                                    Website Development by Lefteris Mavrakis
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GlobalContextProvider>
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
