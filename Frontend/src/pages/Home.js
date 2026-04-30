// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Marquee from "react-fast-marquee";
// import BlogCard from "../components/BlogCard";
// import ProductCard from "../components/ProductCard";
// import SpecialProduct from "../components/SpecialProduct";
// import Container from "../components/Container";
// import { services } from "../utils/Data";
// import prodcompare from "../images/prodcompare.svg";
// import wish from "../images/wish.svg";
// import wishlist from "../images/wishlist.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.avif";
// import addcart from "../images/add-cart.svg";
// import view from "../images/view.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllBlogs } from "../features/blogs/blogSlice";
// import moment from "moment";
// import { getAllProducts } from "../features/products/productSlilce";
// import ReactStars from "react-rating-stars-component";
// import { addToWishlist } from "../features/products/productSlilce";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// const Home = () => {
//   const blogState = useSelector((state) => state?.blog?.blog);
//   const productState = useSelector((state) => state?.product?.product);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     getblogs();
//     getProducts();
//   }, []);
//   const getblogs = () => {
//     dispatch(getAllBlogs());
//   };

//   const getProducts = () => {
//     dispatch(getAllProducts());
//   };

//   const addToWish = (id) => {
//     //alert(id);
//     dispatch(addToWishlist(id));
//   };
//   return (
//     <>
//     <section
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "90vh", // you can adjust to 70vh if you want smaller height
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden",
//         borderRadius: "0px",
//       }}
//     >
//       {/* Background Image */}
//       <img
//         src="images/123.jpg"
//         alt="Fashion Banner"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover", // ensures it fills horizontally without distortion
//           objectPosition: "center", // keeps it centered
//         }}
//       />

//       {/* Overlay Tint */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.4)", // dark overlay
//         }}
//       ></div>

//       {/* Content */}
//       <div
//         style={{
//           position: "relative",
//           color: "white",
//           textAlign: "center",
//           padding: "0 20px",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "3rem",
//             fontWeight: "bold",
//             marginBottom: "1rem",
//             letterSpacing: "1px",
//           }}
//         >
//           Discover Your Style
//         </h1>
//         <p style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
//           Trendy collections for every season
//         </p>
//         <a
//           href="/product"
//           style={{
//             display: "inline-block",
//             backgroundColor: "white",
//             color: "black",
//             fontWeight: "600",
//             padding: "12px 32px",
//             borderRadius: "50px",
//             textDecoration: "none",
//             transition: "background 0.3s ease",
//           }}
//           onMouseEnter={(e) => (e.target.style.background = "#ddd")}
//           onMouseLeave={(e) => (e.target.style.background = "white")}
//         >
//           Shop Now
//         </a>
//       </div>
//     </section>
     
//       <Container class1="home-wrapper-2 py-5">
//         <div className="row">
//           <div className="col-12">
//             <div className="servies d-flex align-items-center justify-content-between">
//               {services?.map((i, j) => {
//                 return (
//                   <div className="d-flex align-items-center gap-15" key={j}>
//                     <img src={i.image} alt="services" />
//                     <div>
//                       <h6>{i.title}</h6>
//                       <p className="mb-0">{i.tagline}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </Container>

//       <Container class1="featured-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="section-heading">Featured Collection</h3>
//           </div>
//           {productState &&
//             productState?.map((item, index) => {
//               if (item.tags === "featured") {
//                 return (
//                   <div key={index} className={"col-3"}>
//                     <div className="product-card position-relative">
//                       <div className="wishlist-icon position-absolute">
//                         <button className="border-0 bg-transparent">
//                           <img
//                             src={wish}
//                             alt="wishlist"
//                             onClick={(e) => {
//                               addToWish(item?._id);
//                             }}
//                           />
//                         </button>
//                       </div>
//                       <div className="product-image">
//                         <img
//                           src={item?.images[0]?.url}
//                           //className="img-fluid d"
//                           alt="product image"
//                           height={"250px"}
//                           width={"260px"}
//                           onClick={() => navigate("/product/" + item?._id)}
//                         />
//                         <img
//                           src={item?.images[0]?.url}
//                           //className="img-fluid d"
//                           alt="product image"
//                           height={"250px"}
//                           width={"260px"}
//                           onClick={() => navigate("/product/" + item?._id)}
//                         />
//                       </div>
//                       <div className="product-details">
//                         <h6 className="brand">{item?.brand}</h6>
//                         <h5 className="product-title">
//                           {item?.title?.substr(0, 70) + "..."}
//                         </h5>
//                         <ReactStars
//                           count={5}
//                           size={24}
//                           value={item?.totalrating.toString()}
//                           edit={false}
//                           activeColor="#ffd700"
//                         />

//                         <p className="price">Rs. {item?.price}</p>
//                       </div>
//                       <div className="action-bar position-absolute">
//                         <div className="d-flex flex-column gap-15">
//                           <button className="border-0 bg-transparent">
//                             <img src={prodcompare} alt="compare" />
//                           </button>
//                           <button className="border-0 bg-transparent">
//                             <img
//                               onClick={() => navigate("/product/" + item?._id)}
//                               src={view}
//                               alt="view"
//                             />
//                           </button>
//                           <button className="border-0 bg-transparent">
//                             <img src={addcart} alt="addcart" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               }
//             })}
//         </div>
//       </Container>


//       <div
//       style={{
//         padding: "50px 0",
//         backgroundColor: "#f8f8f8",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           gap: "20px",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* Card 1 */}
//         <div
//           style={{
//             flex: "1 1 22%",
//             background: "linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)",
//             borderRadius: "15px",
//             padding: "30px 20px",
//             textAlign: "center",
//             color: "#222",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//         >
//           <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Women’s Collection</h4>
//           <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>New Arrivals</h3>
//           <p style={{ fontSize: "1rem" }}>Fresh looks for every occasion.</p>
//         </div>

//         {/* Card 2 */}
//         <div
//           style={{
//             flex: "1 1 22%",
//             background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
//             borderRadius: "15px",
//             padding: "30px 20px",
//             textAlign: "center",
//             color: "#222",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//         >
//           <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Men’s Wear</h4>
//           <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>Classic & Modern</h3>
//           <p style={{ fontSize: "1rem" }}>Redefine your wardrobe essentials.</p>
//         </div>

//         {/* Card 3 */}
//         <div
//           style={{
//             flex: "1 1 22%",
//             background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
//             borderRadius: "15px",
//             padding: "30px 20px",
//             textAlign: "center",
//             color: "#222",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//         >
//           <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Footwear</h4>
//           <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>Step into Style</h3>
//           <p style={{ fontSize: "1rem" }}>Trendy sneakers and comfy heels.</p>
//         </div>

//         {/* Card 4 */}
//         <div
//           style={{
//             flex: "1 1 22%",
//             background: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
//             borderRadius: "15px",
//             padding: "30px 20px",
//             textAlign: "center",
//             color: "#222",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//         >
//           <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Accessories</h4>
//           <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>Complete the Look</h3>
//           <p style={{ fontSize: "1rem" }}>Bags, belts, and jewelry that shine.</p>
//         </div>
//       </div>
//     </div>


//       <Container class1="special-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="section-heading">Special Products</h3>
//           </div>
//         </div>
//         <div className="row">
//           {productState &&
//             productState?.map((item, index) => {
//               if (item.tags === "special") {
//                 //console.log(item?._id);
//                 return (
//                   <SpecialProduct
//                     key={index}
//                     id={item?._id}
//                     title={item?.title}
//                     brand={item?.brand}
//                     totalrating={item?.totalrating.toString()}
//                     price={item?.price}
//                     img={item?.images[0].url}
//                     sold={item?.sold}
//                     quantity={item?.quantity}
//                   />
//                 );
//               }
//             })}
//         </div>
//       </Container>
//       <Container class1="popular-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="section-heading">Our Popular Products</h3>
//           </div>
//         </div>
//         <div className="row">
//           {productState &&
//             productState?.map((item, index) => {
//               if (item.tags === "popular") {
//                 return (
//                   <div key={index} className={"col-3"}>
//                     <div className="product-card position-relative">
//                       <div className="wishlist-icon position-absolute">
//                         <button className="border-0 bg-transparent">
//                           <img
//                             src={wish}
//                             alt="wishlist"
//                             onClick={(e) => {
//                               addToWish(item?._id);
//                             }}
//                           />
//                         </button>
//                       </div>
//                       <div className="product-image">
//                         <img
//                           src={item?.images[0].url}
//                           // className="img-fluid d"
//                           alt="product image"
//                           height={"250px"}
//                           width={"100%"}
//                           onClick={() => navigate("/product/" + item?._id)}
//                         />
//                         <img
//                           src={item?.images[0].url}
//                           // className="img-fluid d"
//                           alt="product image"
//                           height={"250px"}
//                           width={"100%"}
//                           onClick={() => navigate("/product/" + item?._id)}
//                         />
//                       </div>
//                       <div className="product-details">
//                         <h6 className="brand">{item?.brand}</h6>
//                         <h5 className="product-title">
//                           {item?.title?.substr(0, 70) + "..."}
//                         </h5>
//                         <ReactStars
//                           count={5}
//                           size={24}
//                           value={item?.totalrating.toString()}
//                           edit={false}
//                           activeColor="#ffd700"
//                         />

//                         <p className="price">Rs. {item?.price}</p>
//                       </div>
//                       <div className="action-bar position-absolute">
//                         <div className="d-flex flex-column gap-15">
//                           {/* <button className="border-0 bg-transparent">
//                             <img src={prodcompare} alt="compare" />
//                           </button> */}
//                           {/* <button className="border-0 bg-transparent">
//                             <ass
//                               onClick={() => navigate("/product/" + item?._id)}
//                               src={view}
//                               alt="view"
//                             />
//                           </button> */}
//                           {/* <button className="border-0 bg-transparent">
//                             <img src={addcart} alt="addcart" />
//                           </button> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               }
//             })}
//         </div>
//       </Container>
      

//       <Container class1="blog-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="section-heading">Our Latest Blogs</h3>
//           </div>
//         </div>
//         <div className="row">
//           {blogState &&
//             blogState?.map((item, index) => {
//               if (index < 4) {
//                 return (
//                   <div className="col-3 " key={index}>
//                     <BlogCard
//                       id={item?._id}
//                       title={item?.title}
//                       description={item?.description}
//                       image={item?.images[0]?.url}
//                       date={moment(item?.createdAt).format(
//                         "MMMM Do YYYY, h:mm a"
//                       )}
//                     />
//                   </div>
//                 );
//               }
//             })}
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlilce";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const featuresRef = useRef(null);
  const newsletterRef = useRef(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productState = useSelector((state) => state?.product?.product);

  useEffect(() => {
    dispatch(getAllProducts());

    // Hero Animation
    gsap.fromTo(heroRef.current.querySelector(".hero-content > *"), 
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      }
    );

    // Category Cards Animation
    gsap.fromTo(".category-card",
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
        }
      }
    );

    // Product Cards Animation
    gsap.fromTo(".premium-card",
      { opacity: 0, y: 100, rotationX: 15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 75%",
        }
      }
    );

    // Features Animation
    gsap.fromTo(".feature-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        }
      }
    );

    // Newsletter Animation
    gsap.fromTo(newsletterRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top 90%",
        }
      }
    );

    // Parallax effect on hero
    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, [dispatch]);

  const categories = [
    { name: "Dresses", image: "/images/cat-1.jpg" },
    { name: "Tops", image: "/images/cat-2.jpg" },
    { name: "Ethnic Wear", image: "/images/cat-3.jpg" },
    { name: "Accessories", image: "/images/cat-4.jpg" }
  ];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section ref={heroRef} className="hero-section">
        <img src="/images/123.jpg" alt="hero" className="hero-bg" />
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <span className="hero-subtitle">New Collection 2026</span>
          <h1>Elegance Redefined</h1>
          <p>Premium styles curated for the modern woman</p>
          <div className="hero-buttons">
            <Link to="/product" className="hero-btn primary">
              Shop Now
            </Link>
            <Link to="/product" className="hero-btn secondary">
              View Collection
            </Link>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section ref={featuresRef} className="features-bar">
        <div className="feature-item">
          <span className="feature-icon">✦</span>
          <div>
            <h4>Free Shipping</h4>
            <p>On orders above ₹999</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">↻</span>
          <div>
            <h4>Easy Returns</h4>
            <p>30-day return policy</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">★</span>
          <div>
            <h4>Authentic</h4>
            <p>100% genuine products</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">◈</span>
          <div>
            <h4>24/7 Support</h4>
            <p>Dedicated assistance</p>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section ref={categoriesRef} className="category-section">
        <div className="section-header">
          <span className="section-tag">Browse</span>
          <h2>Shop By Category</h2>
          <p>Explore our curated collections</p>
        </div>
        
        <div className="category-grid">
          {categories.map((cat, index) => (
            <div key={index} className="category-card">
              <div className="category-bg">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="category-content">
                <h3>{cat.name}</h3>
                <Link to="/product" className="category-link">
                  Explore <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER SECTION */}
      <section className="banner-section">
        <div className="banner-content">
          <span className="section-tag">Limited Time</span>
          <h2>Flat 40% Off</h2>
          <p>On ethnic wear collection</p>
          <Link to="/product" className="hero-btn primary">
            Shop Now
          </Link>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section ref={productsRef} className="product-section">
        <div className="section-header">
          <span className="section-tag">Trending</span>
          <h2>Featured Collection</h2>
          <p>Handpicked styles for you</p>
        </div>
        
        <div className="product-grid">
          {productState && productState.slice(0, 8).map((item, index) => (
            <div 
              key={index} 
              className="premium-card"
              onClick={() => navigate("/product/" + item._id)}
            >
              <div className="card-image-wrapper">
                <img src={item?.images[0]?.url} alt={item.title} />
                <div className="card-badge">New</div>
              </div>
              <div className="card-content">
                <span className="card-brand">{item?.brand}</span>
                <h5 className="card-title">{item?.title?.substring(0, 40)}...</h5>
                <div className="card-price">
                  <span className="current-price">₹ {item?.price}</span>
                  <span className="original-price">₹ {Math.round(item?.price * 1.3)}</span>
                  <span className="discount">-30%</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="action-btn">Quick View</button>
                <button className="action-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all-wrapper">
          <Link to="/product" className="view-all-btn">
            View All Products
          </Link>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="value-section">
        <div className="value-grid">
          <div className="value-card">
            <div className="value-number">01</div>
            <h3>Quality First</h3>
            <p>Premium fabrics sourced from the finest mills</p>
          </div>
          <div className="value-card">
            <div className="value-number">02</div>
            <h3>Style Expert</h3>
            <p>Curated by fashion experts worldwide</p>
          </div>
          <div className="value-card">
            <div className="value-number">03</div>
            <h3>Sustainable</h3>
            <p>Eco-friendly practices in every step</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section ref={newsletterRef} className="newsletter-section">
        <div className="newsletter-content">
          <span className="section-tag">Stay Updated</span>
          <h2>Join Our Newsletter</h2>
          <p>Subscribe for exclusive offers and style tips</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Shree Fashion</h3>
            <p>Your destination for premium women's fashion</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/product">New Arrivals</Link>
            <Link to="/product">Best Sellers</Link>
            <Link to="/product">Ethnic Wear</Link>
            <Link to="/product">Accessories</Link>
          </div>
          <div className="footer-links">
            <h4>Help</h4>
            <Link to="/product">Shipping Info</Link>
            <Link to="/product">Returns</Link>
            <Link to="/product">FAQ</Link>
            <Link to="/product">Contact Us</Link>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <span>◉</span>
              <span>◉</span>
              <span>◉</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Shree Fashion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;