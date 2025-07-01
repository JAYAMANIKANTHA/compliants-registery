import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC'

const SignUp = () => {
   const [title, setTitle] = useState("Select User")
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
   })

   const [animate, setAnimate] = useState(false)
   useEffect(() => {
      setAnimate(true)
   }, [])

   const styles = {
      background: {
         background: "linear-gradient(135deg, #667eea, #764ba2)",
         minHeight: "100vh",
         padding: "2rem 0",
         position: "relative",
         overflow: "hidden"
      },
      card: {
         background: "rgba(255, 255, 255, 0.1)",
         borderRadius: "20px",
         backdropFilter: "blur(15px)",
         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
         transform: animate ? "translateY(0) scale(1)" : "translateY(100px) scale(0.9)",
         transition: "all 0.6s ease-in-out",
         zIndex: 2
      },
      input: {
         background: "rgba(255, 255, 255, 0.1)",
         border: "none",
         color: "#fff",
         borderRadius: "10px",
         transition: "all 0.3s ease-in-out"
      },
      label: {
         color: "#ccc",
         marginTop: "5px"
      },
      button: {
         background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
         color: "#000",
         border: "none",
         transition: "transform 0.3s ease-in-out"
      },
      bubble: {
         position: "absolute",
         borderRadius: "50%",
         filter: "blur(100px)",
         zIndex: 0
      }
   }

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleTitle = (select) => {
      setTitle(select)
      setUser({ ...user, userType: select });
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const updatedUser = { ...user, userType: title };
      axios.post("http://localhost:8000/SignUp", updatedUser)
         .then((res) => {
            alert("record submitted")
         })
         .catch((err) => {
            console.log(err)
         })
      setUser({
         name: "",
         email: "",
         password: "",
         phone: "",
         userType: ""
      })
   }

   return (
      <>
         <style>
            {`
               @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-30px); }
                  100% { transform: translateY(0px); }
               }
               @keyframes floatReverse {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(30px); }
                  100% { transform: translateY(0px); }
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
            {/* Floating Blurred Bubbles */}
            <div style={{ ...styles.bubble, top: '20%', left: '10%', width: '200px', height: '200px', background: 'radial-gradient(circle, #ff9a9e, #fad0c4)', animation: 'float 8s ease-in-out infinite' }} />
            <div style={{ ...styles.bubble, bottom: '10%', right: '15%', width: '250px', height: '250px', background: 'radial-gradient(circle, #a18cd1, #fbc2eb)', animation: 'floatReverse 9s ease-in-out infinite' }} />

            <div className="container">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                     <div className="card text-white" style={styles.card}>
                        <div className="card-body p-5 text-center">
                           <div className="mb-md-5 mt-md-4 pb-5">
                              <h2 className="fw-bold mb-4">SignUp For Registering the Complaint</h2>
                              <p className="text-white-50 mb-4">Please enter your Details</p>
                              <form onSubmit={handleSubmit}>
                                 <div className="form-outline form-white mb-4">
                                    <input type="name" name="name" value={user.name} onChange={handleChange}
                                       className="form-control form-control-lg"
                                       style={styles.input} required />
                                    <label className="form-label" htmlFor="name" style={styles.label}>Full Name</label>
                                 </div>
                                 <div className="form-outline form-white mb-4">
                                    <input type="email" name="email" value={user.email} onChange={handleChange}
                                       className="form-control form-control-lg"
                                       style={styles.input} required />
                                    <label className="form-label" htmlFor="email" style={styles.label}>Email</label>
                                 </div>
                                 <div className="form-outline form-white mb-4">
                                    <input type="password" name="password" value={user.password} onChange={handleChange}
                                       className="form-control form-control-lg"
                                       style={styles.input} required />
                                    <label className="form-label" htmlFor="password" style={styles.label}>Password</label>
                                 </div>
                                 <div className="form-outline form-white mb-4">
                                    <input type="phone" name="phone" value={user.phone} onChange={handleChange}
                                       className="form-control form-control-lg"
                                       style={styles.input} required />
                                    <label className="form-label" htmlFor="mobile" style={styles.label}>Mobile No.</label>
                                 </div>
                                 <div className="form-outline form-white mb-4">
                                    <Dropdown>
                                       <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                          {title}
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu>
                                          <Dropdown.Item onClick={() => handleTitle("Ordinary")}>Ordinary</Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleTitle("Admin")}>Admin</Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleTitle("Agent")}>Agent</Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                    <label className="form-label" htmlFor="userType" style={styles.label}>Select User Type</label>
                                 </div>
                                 <button
                                    className="btn btn-lg px-5 mt-3"
                                    type="submit"
                                    style={styles.button}
                                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.05) rotateX(5deg)"}
                                    onMouseOut={e => e.currentTarget.style.transform = "scale(1) rotateX(0deg)"}
                                 >
                                    Register
                                 </button>
                              </form>
                           </div>
                           <div>
                              <p className="mb-0">Had an account? <Link to="/Login" className="text-info">Login</Link></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer />
      </>
   )
}

export default SignUp
