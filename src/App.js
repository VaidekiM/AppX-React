import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/" component={LoginPage} />
          <Route
            path="/landing"
            render={(props) => {
              const queryParams = new URLSearchParams(props.location.search);
              const category = queryParams.get('category') || '';
              const subcategory = queryParams.get('subcategory') || '';
              return <LandingPage {...props} category={category} subcategory={subcategory} />;
            }}
          />
          <Route path="/product/:fruitName" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
