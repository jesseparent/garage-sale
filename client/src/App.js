import './App.css';
import './stripe.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CardForm from "./components/CardForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51IBOzADVroZQGKJNBHuaS1Tth2sbnwkctCTXEwxFQbEaMifBsjWzQDHN2wevkBSNQNFNgN55tTs6z66AlqOOEuOZ00eSSBwDEZ");


function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CardForm />
        <Router>

        </Router>
      </Elements>

    </div>
  );
}

export default App;
