import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { base_url, config } from "../utils/axiosConfig";
import {
  createAnOrder,
  deleteUserCart,
  getUserCart,
  resetState,
} from "../features/user/userSlice";

let shippingSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("S tate is Required"),
  city: yup.string().required("city is Required"),
  country: yup.string().required("country is Required"),
  pincode: yup.number("Pincode No is Required").required().positive().integer(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default to COD
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

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
  }, []);

  useEffect(() => {
    if (
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate("/my-orders");
    }
  }, [authState]);

  const [cartProductState, setCartProductState] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      if (paymentMethod === "cod") {
        // For COD, place order directly
        handleCODOrder(values);
      } else {
        // For Razorpay, initiate payment
        handleRazorpayPayment(values);
      }
    },
  });

  // Handle Cash on Delivery order
  const handleCODOrder = async (shippingData) => {
    setIsProcessing(true);
    
    // Build order items from cartState directly
    let orderItems = [];
    for (let index = 0; index < cartState?.length; index++) {
      orderItems.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        size: cartState[index].size?._id,
        price: cartState[index].price,
      });
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty!");
      setIsProcessing(false);
      return;
    }

    try {
      await dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalAmount,
          orderItems: orderItems,
          paymentInfo: {
            razorpayOrderId: "COD",
            razorpayPaymentId: "COD",
          },
          paymentMethod: "cod",
          paymentStatus: "pending",
          shippingInfo: shippingData,
        })
      ).unwrap();
      
      // Clear cart and reset state after successful order
      await dispatch(deleteUserCart(config2));
      localStorage.removeItem("address");
      dispatch(resetState());
      setIsProcessing(false);
      navigate("/my-orders");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async (shippingData) => {
    setIsProcessing(true);
    
    // Wait for cartProductState to be populated
    let orderItems = [...cartProductState];
    
    if (orderItems.length === 0) {
      // Build order items from cartState directly
      for (let index = 0; index < cartState?.length; index++) {
        orderItems.push({
          product: cartState[index].productId._id,
          quantity: cartState[index].quantity,
          color: cartState[index].color._id,
          size: cartState[index].size?._id,
          price: cartState[index].price,
        });
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty!");
      setIsProcessing(false);
      return;
    }
    
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load");
        setIsProcessing(false);
        return;
      }

      // Create Razorpay order on backend
      const result = await axios.post(
        `${base_url}user/order/create-razorpay-order`,
        { amount: totalAmount + 100 },
        config
      );

      if (!result) {
        alert("Something went wrong in checkout handler");
        setIsProcessing(false);
        return;
      }

      const { amount, id: order_id, currency } = result.data.order;

      const options = {
        key: "rzp_test_Sk3RL8gKpEuL38", // Enter the Key ID from paymentCtrl
        amount: amount,
        currency: currency,
        name: "Cart's corner",
        description: "Test Transaction",
        order_id: order_id,
        
        handler: async function (response) {
  const data = {
    razorpayOrderId: response.razorpay_order_id,
    razorpayPaymentId: response.razorpay_payment_id,
    razorpaySignature: response.razorpay_signature,
  };

  // Verify payment on backend
  const verifyResult = await axios.post(
    `${base_url}user/order/paymentVerification`,
    data,
    config
  );

  // Create order after verification
  await dispatch(
    createAnOrder({
      totalPrice: totalAmount,
      totalPriceAfterDiscount: totalAmount,
      orderItems: orderItems,
      paymentInfo: verifyResult.data,
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      shippingInfo: shippingData,
    })
  ).unwrap();

  await dispatch(deleteUserCart(config2));
  localStorage.removeItem("address");
  dispatch(resetState());
  setIsProcessing(false);
  navigate("/my-orders");
},
        prefill: {
          name: `${shippingData.firstname} ${shippingData.lastname}`,
          email: getTokenFromLocalStorage?.email || "",
          contact: getTokenFromLocalStorage?.mobile || "",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        size: cartState[index].size?._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);


  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2 " id="smooth-content">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="checkout-left-data">
              <h3 className="website-name">Cart Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Dev Jariwala (devjariwala8444@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    className="form-control form-select"
                    id=""
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleChange("country")}
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    className="form-control form-select"
                    id=""
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleChange("state")}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                     <option value="Maharashtra">Maharashtra</option>
                      <option value="Karanataka">Karanataka</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="form-control"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="w-100 mt-3">
                  <h4 className="mb-3">Payment Method</h4>
                  <div className="d-flex gap-15 flex-wrap">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="cod">
                        <div className="d-flex align-items-center gap-2">
                          <span>💵 Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="razorpay"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="razorpay">
                        <div className="d-flex align-items-center gap-2">
                          <span>💳 Pay with Razorpay</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <p className="text-muted mt-2 small">
                      Pay when you receive your order
                    </p>
                  )}
                  {paymentMethod === "razorpay" && (
                    <p className="text-muted mt-2 small">
                      Secure payment via Razorpay
                    </p>
                  )}
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button 
                      className="button" 
                      type="submit"
                      disabled={isProcessing}
                    >
                      {isProcessing 
                        ? "Processing..." 
                        : paymentMethod === "cod" 
                          ? "Place Order (COD)" 
                          : "Pay & Place Order"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            src={item?.productId?.images[0]?.url}
                            width={100}
                            height={100}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title}
                          </h5>
                          <p className="total-price">{item?.color?.title}</p>
                          {item?.size?.title && (
                            <p className="total-price">Size: {item.size.title}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          Rs. {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  Rs. {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">Rs. 100</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                Rs. {totalAmount ? totalAmount + 100 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
