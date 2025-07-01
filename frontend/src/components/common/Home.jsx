import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image1 from '../../Images/Image1.png'
import { Link } from 'react-router-dom';
import Footer from './FooterC'

const Home = () => {
   const [animate, setAnimate] = useState(false);
   useEffect(() => {
      setAnimate(true);
   }, []);

   const styles = {
      background: {
         position: "relative",
         minHeight: "100vh",
         background: "linear-gradient(120deg, #3a6073, #16222a)",
         color: "#fff",
         overflow: "hidden",
         padding: "2rem 0"
      },
      cloud: {
         position: "absolute",
         borderRadius: "50%",
         filter: "blur(100px)",
         opacity: 0.4,
         zIndex: 0
      },
      content: {
         display: "flex",
         flexDirection: "row",
         justifyContent: "center",
         alignItems: "center",
         zIndex: 2,
         position: "relative",
         gap: "2rem",
         paddingTop: "3rem",
         paddingBottom: "3rem",
         transform: animate ? "translateY(0px)" : "translateY(100px)",
         opacity: animate ? 1 : 0,
         transition: "all 1s ease"
      },
      leftImage: {
         width: "100%",
         borderRadius: "20px",
         boxShadow: "0 0 30px rgba(0,0,0,0.4)",
         animation: "pulseGlow 4s ease-in-out infinite",
         transition: "transform 0.3s ease",
         position: "relative",
         zIndex: 1
      },
      glowAura: {
         position: "absolute",
         top: "-10%",
         left: "-10%",
         width: "120%",
         height: "120%",
         borderRadius: "50%",
         background: "radial-gradient(circle, rgba(255,255,255,0.08), rgba(255,255,255,0))",
         animation: "glowRotate 20s linear infinite",
         zIndex: 0
      },
      rightText: {
         background: "rgba(255,255,255,0.1)",
         padding: "2rem",
         borderRadius: "20px",
         backdropFilter: "blur(15px)",
         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
         fontSize: "1.2rem",
         maxWidth: "500px"
      },
      big: { fontSize: "1.5rem", fontWeight: "600" },
      bigger: { fontSize: "1.7rem", fontWeight: "700" },
      animatedButton: {
         marginTop: "1.5rem",
         padding: "12px 30px",
         fontSize: "1rem",
         fontWeight: "bold",
         color: "#000",
         background: "linear-gradient(135deg, #43e97b, #38f9d7)",
         border: "none",
         borderRadius: "12px",
         cursor: "pointer",
         transition: "transform 0.3s ease, box-shadow 0.3s ease",
         boxShadow: "0 0 10px rgba(0,255,255,0.4)"
      }
   }

   return (
      <>
         <style>
            {`
               @keyframes cloudFloat {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-50px); }
                  100% { transform: translateY(0px); }
               }

               @keyframes pulseGlow {
                  0% { filter: brightness(1); }
                  50% { filter: brightness(1.08); }
                  100% { filter: brightness(1); }
               }

               @keyframes glowRotate {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
               }

               .animated-button:hover {
                  transform: scale(1.05);
                  box-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
               }

               .animated-button:active {
                  transform: scale(0.97);
                  box-shadow: 0 0 10px rgba(0, 255, 255, 0.4) inset;
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

         <div style={styles.background}>
            {/* Floating Blurred Clouds */}
            <div style={{ ...styles.cloud, top: '10%', left: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, #ffdde1, #ee9ca7)', animation: 'cloudFloat 10s ease-in-out infinite' }} />
            <div style={{ ...styles.cloud, bottom: '15%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, #a1c4fd, #c2e9fb)', animation: 'cloudFloat 12s ease-in-out infinite' }} />
            <div style={{ ...styles.cloud, top: '50%', left: '40%', width: '200px', height: '200px', background: 'radial-gradient(circle, #d4fc79, #96e6a1)', animation: 'cloudFloat 14s ease-in-out infinite' }} />

            <Container style={styles.content}>
               <div className="left-side" style={{ flex: 1, position: "relative" }}>
                  <div style={styles.glowAura}></div>
                  <img
                     src={Image1}
                     alt="illustration"
                     style={styles.leftImage}
                     onMouseOver={e => e.currentTarget.style.transform = "rotateY(10deg) scale(1.03)"}
                     onMouseOut={e => e.currentTarget.style.transform = "rotateY(0deg) scale(1)"}
                  />
               </div>

               <div className="right-side" style={styles.rightText}>
                  <p>
                     <span style={styles.bigger}>Empower Your Team,</span><br />
                     <span style={styles.big}>Exceed Customer Expectations: Discover our</span><br />
                     <span style={styles.bigger}>Complaint Management Solution</span><br />
                     <Link to={'/Login'}>
                        <button
                           className="animated-button"
                           style={styles.animatedButton}
                        >
                           Register your Complaint
                        </button>
                     </Link>
                  </p>
               </div>
            </Container>
         </div>

         <Footer />
      </>
   )
}

export default Home
