import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlilce";
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from "../features/products/productSlilce";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getblogs();
    getProducts();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    //alert(id);
    dispatch(addToWishlist(id));
  };
  return (
    <>
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "90vh", // you can adjust to 70vh if you want smaller height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: "0px",
      }}
    >
      {/* Background Image */}
      <img
        src="images/123.jpg"
        alt="Fashion Banner"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // ensures it fills horizontally without distortion
          objectPosition: "center", // keeps it centered
        }}
      />

      {/* Overlay Tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)", // dark overlay
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          color: "white",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            letterSpacing: "1px",
          }}
        >
          Discover Your Style
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
          Trendy collections for every season
        </p>
        <a
          href="/product"
          style={{
            display: "inline-block",
            backgroundColor: "white",
            color: "black",
            fontWeight: "600",
            padding: "12px 32px",
            borderRadius: "50px",
            textDecoration: "none",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#ddd")}
          onMouseLeave={(e) => (e.target.style.background = "white")}
        >
          Shop Now
        </a>
      </div>
    </section>
     
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          //className="img-fluid d"
                          alt="product image"
                          height={"250px"}
                          width={"260px"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                        <img
                          src={item?.images[0]?.url}
                          //className="img-fluid d"
                          alt="product image"
                          height={"250px"}
                          width={"260px"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price">Rs. {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>


      <div
      style={{
        padding: "50px 0",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            flex: "1 1 22%",
            background: "linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)",
            borderRadius: "15px",
            padding: "30px 20px",
            textAlign: "center",
            color: "#222",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Women’s Collection</h4>
          <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>New Arrivals</h3>
          <p style={{ fontSize: "1rem" }}>Fresh looks for every occasion.</p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            flex: "1 1 22%",
            background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
            borderRadius: "15px",
            padding: "30px 20px",
            textAlign: "center",
            color: "#222",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Men’s Wear</h4>
          <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>Classic & Modern</h3>
          <p style={{ fontSize: "1rem" }}>Redefine your wardrobe essentials.</p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            flex: "1 1 22%",
            background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
            borderRadius: "15px",
            padding: "30px 20px",
            textAlign: "center",
            color: "#222",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Footwear</h4>
          <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>Step into Style</h3>
          <p style={{ fontSize: "1rem" }}>Trendy sneakers and comfy heels.</p>
        </div>

        {/* Card 4 */}
        <div
          style={{
            flex: "1 1 22%",
            background: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
            borderRadius: "15px",
            padding: "30px 20px",
            textAlign: "center",
            color: "#222",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h4 style={{ fontSize: "1.1rem", letterSpacing: "1px" }}>Accessories</h4>
          <h3 style={{ fontSize: "1.6rem", margin: "10px 0" }}>Complete the Look</h3>
          <p style={{ fontSize: "1rem" }}>Bags, belts, and jewelry that shine.</p>
        </div>
      </div>
    </div>


      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "special") {
                //console.log(item?._id);
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    img={item?.images[0].url}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0].url}
                          // className="img-fluid d"
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                        <img
                          src={item?.images[0].url}
                          // className="img-fluid d"
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price">Rs. {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button> */}
                          {/* <button className="border-0 bg-transparent">
                            <ass
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button> */}
                          {/* <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState &&
            blogState?.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="col-3 " key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
