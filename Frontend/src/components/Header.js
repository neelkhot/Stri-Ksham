import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlilce";
import { getUserCart } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector((state) => state?.product?.product);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
    
    // Scroll listener for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [productOpt, setProductOpt] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className={`premium-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-top-bar">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="col-6">
                <p className="top-bar-text">
                  <span className="highlight">Free Shipping</span> on orders above ₹999
                </p>
              </div>
              <div className="col-6">
                <div className="top-bar-right">
                  <p className="top-bar-text">
                    Need Help? 
                    <a className="contact-link" href="tel:+91 8788790703">
                      +91 8788790703
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="header-main">
          <div className="container-xxl">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-2">
                <Link className="brand-logo" to="/">
                  <span className="logo-text">SHREE</span>
                  <span className="logo-sub">FASHION</span>
                </Link>
              </div>

              {/* Search Bar */}
              <div className="col-5">
                <div className="premium-search">
                  <Typeahead
                    id="pagination-example"
                    onPaginate={() => console.log("Results paginated")}
                    onChange={(selected) => {
                      navigate(`/product/${selected[0]?.prod}`);
                      dispatch(getAProduct(selected[0]?.prod));
                    }}
                    options={productOpt}
                    paginate={paginate}
                    labelKey={"name"}
                    placeholder="Search for Products..."
                    className="search-input"
                  />
                  <button className="search-btn">
                    <BsSearch className="fs-6" />
                  </button>
                </div>
              </div>

              {/* Action Icons */}
              <div className="col-5">
                <div className="header-actions">
                  <Link to="/compare-product" className="action-item">
                    <div className="icon-wrapper">
                      <img src={compare} alt="compare" />
                    </div>
                    <div className="action-label">
                      <span className="action-title">Compare</span>
                      <span className="action-sub">Products</span>
                    </div>
                  </Link>
                  
                  <Link to="/wishlist" className="action-item">
                    <div className="icon-wrapper">
                      <img src={wishlist} alt="wishlist" />
                      <span className="badge-count">2</span>
                    </div>
                    <div className="action-label">
                      <span className="action-title">Wishlist</span>
                      <span className="action-sub">Items</span>
                    </div>
                  </Link>
                  
                  <Link to={authState?.user === null ? "/login" : "/my-profile"} className="action-item">
                    <div className="icon-wrapper user-icon">
                      <img src={user} alt="user" />
                    </div>
                    <div className="action-label">
                      {authState?.user === null ? (
                        <>
                          <span className="action-title">Sign In</span>
                          <span className="action-sub">Account</span>
                        </>
                      ) : (
                        <span className="action-title">Welcome, {authState?.user?.firstname}</span>
                      )}
                    </div>
                  </Link>
                  
                  <Link to="/cart" className="action-item cart-item">
                    <div className="icon-wrapper">
                      <img src={cart} alt="cart" />
                      {cartState?.length > 0 && (
                        <span className="badge-count">{cartState?.length}</span>
                      )}
                    </div>
                    <div className="action-label">
                      <span className="action-title">₹{total || 0}</span>
                      <span className="action-sub">Cart</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="header-nav">
          <div className="container-xxl">
            <div className="nav-content">
              <button 
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <img src={menu} alt="menu" />
              </button>
              
              <ul className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/product">Shop</Link></li>
                <li><Link to="/product">New Arrivals</Link></li>
                <li><Link to="/product">Dresses</Link></li>
                <li><Link to="/product">Ethnic Wear</Link></li>
                <li><Link to="/product">Accessories</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>

              <div className="nav-extras">
                <span className="extra-item">Track Order</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
