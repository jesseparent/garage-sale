import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
<<<<<<< HEAD
import DetailBrief from "./components/DetailBrief";
import { StoreProvider } from "./utils/GlobalState";
import AddProduct from "./pages/AddProduct";

// import ImageUpload from './pages/ImageUpload';
// import GitImage from 'components/GetImage';

// import ItemCard from './components/ItemCard';
import Detail from "./pages/Detail";
=======
import ChatApp from "./chat/components/ChatApp";
import DetailBrief from './components/DetailBrief';
import { StoreProvider } from "./utils/GlobalState";
import AddProduct from './pages/AddProduct';
import Detail from './pages/Detail';
import ImageUpload from './pages/ImageUpload';
// import ItemCard from './componets/ItemCard';
>>>>>>> be3e116a38106c6213862a71c6058385084acb20

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
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
=======
              <Route exact path="/chat" component={ChatApp} />
>>>>>>> be3e116a38106c6213862a71c6058385084acb20
              <Route exact path="/add" component={AddProduct} />
              <Route exact path="/product" component={Detail} />
              <Route exact path="/navCard" component={DetailBrief} />
              <Route exact path="/addproduct" component={AddProduct} />
              <Route exact path="/imageupload/:id" component={ImageUpload} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
