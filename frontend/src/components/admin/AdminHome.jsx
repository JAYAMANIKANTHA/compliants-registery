import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');
   const [userName, setUserName] = useState('');
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               setUserName(user.name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
      setTimeout(() => setLoaded(true), 100); // Delay for smooth animation
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   const styles = {
      contentContainer: {
         padding: "2rem",
         transition: "all 0.6s ease",
         opacity: loaded ? 1 : 0,
         transform: loaded ? "translateY(0)" : "translateY(40px)",
         background: "rgba(255,255,255,0.05)",
         backdropFilter: "blur(8px)",
         borderRadius: "15px",
         margin: "2rem",
         boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
         color: "#fff"
      },
      navLink: {
         marginRight: "1rem",
         padding: "8px 12px",
         transition: "all 0.3s ease",
         borderRadius: "6px"
      },
      navLinkActive: {
         backgroundColor: "#00f5ff",
         color: "#000",
         fontWeight: "bold",
         boxShadow: "0 0 10px #00f5ff"
      }
   };

   return (
      <>
         <style>{`
            .nav-link:hover {
               transform: scale(1.05);
               color: #00f5ff !important;
            }
         `}</style>

         <Navbar className="text-white" bg="dark" expand="lg">
            <Container fluid>
               <Navbar.Brand className="text-white">Hi Admin {userName}</Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="text-white me-auto my-2 my-lg-0" navbarScroll>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'dashboard' ? 'active' : ''}`}
                        style={{
                           ...styles.navLink,
                           ...(activeComponent === 'dashboard' ? styles.navLinkActive : {})
                        }}
                        onClick={() => handleNavLinkClick('dashboard')}
                     >
                        Dashboard
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'UserInfo' ? 'active' : ''}`}
                        style={{
                           ...styles.navLink,
                           ...(activeComponent === 'UserInfo' ? styles.navLinkActive : {})
                        }}
                        onClick={() => handleNavLinkClick('UserInfo')}
                     >
                        User
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'Agent' ? 'active' : ''}`}
                        style={{
                           ...styles.navLink,
                           ...(activeComponent === 'Agent' ? styles.navLinkActive : {})
                        }}
                        onClick={() => handleNavLinkClick('Agent')}
                     >
                        Agent
                     </NavLink>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-danger">
                     Log out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div className="content" style={styles.contentContainer}>
            {activeComponent === 'dashboard' && <AccordionAdmin />}
            {activeComponent === 'UserInfo' && <UserInfo />}
            {activeComponent === 'Agent' && <AgentInfo />}
         </div>
      </>
   );
};

export default AdminHome;
