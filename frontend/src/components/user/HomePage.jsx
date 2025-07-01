import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   const styles = {
      nav: {
         background: "linear-gradient(270deg, #667eea, #764ba2, #43e97b, #38f9d7)",
         backgroundSize: "800% 800%",
         animation: "gradientBG 15s ease infinite",
         color: "#fff"
      },
      navLink: {
         color: "white",
         transition: "all 0.3s ease",
         marginRight: "10px",
         fontWeight: "500"
      },
      navLinkActive: {
         transform: "scale(1.1)",
         textDecoration: "underline"
      },
      containerGlass: {
         marginTop: "2rem",
         padding: "2rem",
         background: "rgba(255,255,255,0.1)",
         backdropFilter: "blur(10px)",
         borderRadius: "15px",
         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
         color: "#fff"
      }
   };

   return (
      <>
         <style>
            {`
               @keyframes gradientBG {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
               }
               .nav-link:hover {
                  transform: scale(1.05);
                  color: #00f5ff !important;
               }
               .nav-link.active {
                  font-weight: bold;
                  text-shadow: 0 0 10px #00ffd9;
               }
            `}
         </style>

         <nav className="navbar navbar-expand-lg" style={styles.nav}>
            <div className="container-fluid">
               <h1 className="navbar-brand text-light">Hi, {userName}</h1>
               <div className="mt-2 navbar-collapse text-light" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-lg-0">
                     <li className="nav-item mb-2">
                        <NavLink
                           className={`nav-link text-light ${activeComponent === 'Complaint' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Complaint')}
                           style={{
                              ...styles.navLink,
                              ...(activeComponent === 'Complaint' ? styles.navLinkActive : {})
                           }}
                        >
                           Complaint Register
                        </NavLink>
                     </li>
                     <li className="nav-item mb-2">
                        <NavLink
                           className={`nav-link text-light ${activeComponent === 'Status' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Status')}
                           style={{
                              ...styles.navLink,
                              ...(activeComponent === 'Status' ? styles.navLinkActive : {})
                           }}
                        >
                           Status
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <button className="btn btn-danger" onClick={Logout}>
                  LogOut
               </button>
            </div>
         </nav>

         <div className="body">
            <div className="container" style={styles.containerGlass}>
               {activeComponent === 'Complaint' && <Complaint />}
               {activeComponent === 'Status' && <Status />}
            </div>
         </div>

         <Footer />
      </>
   );
};

export default HomePage;
