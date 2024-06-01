import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import SignUp from './forms/SignUp';
import LogIn from './forms/LogIn';
import UserProfile from './profile/UserProfile';
import OrderForm from './order/OrderForm';
import OrderPayment from './order/order-payment';
import Footer from './components/footer';
import ProductDetailsPage from './product/ProductDetailsPage';
import Cart from './product/Cart';
import Cartpage from './pages/Cartpage';
import ProductsByCategory from './product/ProductByCategory';
import Success from './payment/success';
import Cancel from './payment/cancel';
import './App.css';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/ProductByCategory/:category" element={<ProductsByCategory />} />
          <Route path="/ProductDetailsPage/:productId" element={<ProductDetailsPage />} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/OrderForm" element={<OrderForm />} />
          <Route path="/order-payment" element={<OrderPayment />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
