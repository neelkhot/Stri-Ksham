import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlilce";
import heroImage from "../images/heroimage.jpg";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const featuresRef = useRef(null);
  const newsletterRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productState = useSelector((state) => state?.product?.product);

  useEffect(() => {
    const ctx = gsap.context(() => {
    // Page load transition
    setTimeout(() => setIsLoaded(true), 100);

    dispatch(
      getAllProducts({
        limit: 8,
        fields: "title,brand,price,images,createdAt",
      })
    );

    // Hero Content Animation (on load)
    gsap.fromTo(heroRef.current.querySelectorAll(".hero-content > *"), 
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      }
    );

    // Multi-layer Parallax Effect
    gsap.to(".parallax-layer-1", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".parallax-layer-2", {
      yPercent: 42,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".parallax-layer-3", {
      yPercent: 68,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".hero-marquee-line.line-top", {
      xPercent: -28,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".hero-marquee-line.line-bottom", {
      xPercent: 28,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Floating particles animation
    gsap.to(".floating-element", {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      rotation: "random(-10, 10)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });

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

    setTimeout(() => ScrollTrigger.refresh(), 500);
    }, heroRef);

    return () => ctx.revert();
  }, [dispatch]);

const categories = [
  { name: "Dresses", image: "/images/cat-1.jpg", path: "/dresses" },
  { name: "Jeans", image: "/images/cat-2.jpg", path: "/jeans" },
  { name: "Ethnic Wear", image: "/images/cat-3.jpg", path: "/ethnic-wear" },
  { name: "Accessories", image: "/images/cat-4.jpg", path: "/accessories" }
];

  return (
    <div className={`home-page ${isLoaded ? 'loaded' : ''}`}>
      {/* PAGE LOADING OVERLAY */}
      <div className={`page-loader ${isLoaded ? 'hidden' : ''}`}>
        <div className="loader-content">
          <div className="loader-logo">SF</div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
        </div>
      </div>

      {/* HERO SECTION WITH MULTI-LAYER PARALLAX */}
      <section ref={heroRef} className="hero-section">
        {/* Layer 1 - Furthest (slowest) - Background gradient/texture */}
        <div className="parallax-layer parallax-layer-1">
          <div className="layer-gradient"></div>
          <div className="layer-pattern"></div>
        </div>

        {/* Layer 2 - Mid background */}
        <div className="parallax-layer parallax-layer-2">
          <img src={heroImage} alt="fashion collection hero" className="layer-image" />
        </div>

        {/* Layer 3 - Closer (faster) - Text and floating elements */}
        <div className="parallax-layer parallax-layer-3">
          <div className="hero-text-ribbon ribbon-top" aria-hidden="true">
            <div className="hero-marquee-line line-top">
              <span>NEW COLLECTION</span>
              <span>PREMIUM FASHION</span>
              <span>RIVAA STYLE</span>
              <span>NEW COLLECTION</span>
              <span>PREMIUM FASHION</span>
            </div>
          </div>
          <div className="hero-text-ribbon ribbon-bottom" aria-hidden="true">
            <div className="hero-marquee-line line-bottom">
              <span>ETHNIC WEAR</span>
              <span>MODERN ELEGANCE</span>
              <span>CURATED LOOKS</span>
              <span>ETHNIC WEAR</span>
              <span>MODERN ELEGANCE</span>
            </div>
          </div>
          <div className="floating-element" style={{ top: '15%', left: '10%' }}>✦</div>
          <div className="floating-element" style={{ top: '25%', left: '85%' }}>◇</div>
          <div className="floating-element" style={{ top: '60%', left: '5%' }}>○</div>
          <div className="floating-element" style={{ top: '70%', left: '90%' }}>✦</div>
          <div className="floating-element" style={{ top: '40%', left: '75%' }}>◇</div>
          <div className="floating-element" style={{ top: '80%', left: '20%' }}>○</div>
        </div>

        {/* Main overlay */}
        <div className="hero-overlay" />
        
        {/* Hero content */}
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
        
        {/* Scroll indicator */}
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
    <Link to={cat.path} key={index} className="category-card">
      <div className="category-bg">
        <img src={cat.image} alt={cat.name} />
      </div>
      <div className="category-content">
        <h3>{cat.name}</h3>
        <span className="category-link">
          Explore <span>→</span>
        </span>
      </div>
    </Link>
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
      {/* <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Rivaa collection</h3>
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
          <p>© 2026 Rivaa collection. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
