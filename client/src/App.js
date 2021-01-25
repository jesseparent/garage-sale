import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
<<<<<<< HEAD
import ImageUpload from './pages/ImageUpload';
// import ItemCard from './components/ItemCard';
import Detail from './pages/Detail';
=======
import AddProduct from './pages/AddProduct';
// import ImageUpload from './pages/ImageUpload';
// import ItemCard from './componets/ItemCard';
>>>>>>> main

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
<<<<<<< HEAD
              <Route exact path="/product" component={Detail} />
=======
              <Route exact path="/add" component={AddProduct} />
>>>>>>> main
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
