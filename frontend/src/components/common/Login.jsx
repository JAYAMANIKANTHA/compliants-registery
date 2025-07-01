import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC'

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      email: "",
      password: ""
   });

   const [animate, setAnimate] = useState(false);
   useEffect(() => {
      setAnimate(true);
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8000/Login", user)
         .then((res) => {
            alert("Successfully logged in");
            localStorage.setItem("user", JSON.stringify(res.data));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));
            const { userType } = isLoggedIn
            switch (userType) {
               case "Admin":
                  navigate("/AdminHome")
                  break;
               case "Ordinary":
                  navigate("/HomePage")
                  break;
               case "Agent":
                  navigate("/AgentHome")
                  break;
               default:
                  navigate("/Login")
                  break;
            }
         })
         .catch((err) => {
            if (err.response && err.response.status === 401) {
               alert("User doesn’t exist");
            }
            navigate("/Login");
         });
   };

   const styles = {
      background: {
         background: "linear-gradient(135deg, #667eea, #764ba2)",
         minHeight: "100vh",
         padding: "2rem 0",
         overflow: "hidden",
         position: "relative"
      },
      card: {
         background: "rgba(255, 255, 255, 0.1)",
         borderRadius: "20px",
         backdropFilter: "blur(15px)",
         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
         transform: animate ? "translateY(0)" : "translateY(80px)",
         transition: "all 0.7s ease",
         zIndex: 2
      },
      input: {
         background: "rgba(255, 255, 255, 0.1)",
         border: "none",
         color: "#fff",
         borderRadius: "10px"
      },
      label: {
         color: "#ccc",
         marginTop: "5px"
      },
      button: {
         background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
         color: "#000",
         border: "none",
         transition: "all 0.3s ease-in-out"
      }
   };

   return (
      <>
         <style>
            {`
               @keyframes wave {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
               }
            `}
         </style>

         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand>ComplaintCare</Navbar.Brand>
               <ul className="navbar-nav d-flex flex-row">
                  <li className="nav-item mx-2">
                     <Link to={'/'} className="nav-link text-light">Home</Link>
                  </li>
                  <li className="nav-item mx-2">
                     <Link to={'/signup'} className="nav-link text-light">SignUp</Link>
                  </li>
                  <li className="nav-item mx-2">
                     <Link to={'/login'} className="nav-link text-light">Login</Link>
                  </li>
               </ul>
            </Container>
         </Navbar>

         <section style={styles.background}>
            {/* Animated Gradient Background Wave */}
            <div style={{
               position: "absolute",
               top: 0,
               left: 0,
               width: "200%",
               height: "100%",
               background: "linear-gradient(270deg, #667eea, #764ba2, #43e97b, #38f9d7)",
               backgroundSize: "800% 800%",
               animation: "wave 20s ease infinite",
               filter: "blur(120px)",
               zIndex: 0
            }} />

            <div className="container py-5 h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                     <div className="card text-white" style={styles.card}>
                        <div className="card-body p-5 text-center">
                           <div className="mb-md-5 mt-md-4 pb-5">
                              <h2 className="fw-bold mb-4">Login For Registering the Complaint</h2>
                              <p className="text-white-50 mb-5">Please enter your Credentials!</p>
                              <form onSubmit={handleSubmit}>
                                 <div className="form-outline form-white mb-4">
                                    <input
                                       type="email"
                                       name="email"
                                       value={user.email}
                                       onChange={handleChange}
                                       className="form-control form-control-lg"
                                       style={styles.input}
                                       required
                                    />
                                    <label className="form-label" htmlFor="email" style={styles.label}>Email</label>
                                 </div>
                                 <div className="form-outline form-white mb-4">
                                    <input
                                       type="password"
                                       name="password"
                                       value={user.password}
                                       onChange={handleChange}
                                       className="form-control form-control-lg"
                                       style={styles.input}
                                       autoComplete="off"
                                       required
                                    />
                                    <label className="form-label" htmlFor="password" style={styles.label}>Password</label>
                                 </div>

                                 <button
                                    className="btn btn-lg px-5"
                                    type="submit"
                                    style={styles.button}
                                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                                 >
                                    Login
                                 </button>
                              </form>
                           </div>
                           <div>
                              <p className="mb-0">Don't have an account? <Link to="/SignUp" className="text-info">SignUp</Link></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer />
      </>
   );
};

export default Login;
