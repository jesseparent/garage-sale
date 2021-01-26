import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import ChatApp from "./chat/components/ChatApp";
import DetailBrief from './components/DetailBrief';
import { StoreProvider } from "./utils/GlobalState";
import AddProduct from './pages/AddProduct';
import Detail from './pages/Detail';
import ImageUpload from './pages/ImageUpload';
import UserItem from './pages/UserItems';


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
              <Route exact path="/chat/:chatWithUserId" component={ChatApp} />
              <Route exact path="/chat" component={ChatApp} />
              <Route exact path="/product/:id" component={Detail} />
              <Route exact path="/navCard" component={DetailBrief} />
              <Route exact path="/addproduct" component={AddProduct} />
              <Route exact path="/imageupload/:id" component={ImageUpload} />
              <Route exact path="/useritems/:id" component={UserItem} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
