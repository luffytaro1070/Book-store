import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Routes, Route } from 'react-router-dom';
import AllBook from './pages/AllBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory.jsx';
import Settings from './components/Profile/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './components/store/auth.js';
import AllOrders from './pages/AllOrders.jsx';
import AddBook from './pages/AddBook.jsx';
import UpdateBook from './pages/UpdateBook.jsx';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role)
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [])
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/profile" element={<Profile />} >
          {(role === "user") ? <Route index element={<Favourites />} /> : <Route path='/profile/all-orders' index element={<AllOrders />} />}
          <Route path='/profile/orderHistory' element={<UserOrderHistory />} />
          <Route path='/profile/settings' element={<Settings />} />
          {role==="admin" && <Route path="/profile/addbook" element={<AddBook />} />}
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
      </Routes>
      <Footer />


    </div>
  )
}

export default App