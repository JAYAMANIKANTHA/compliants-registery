import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [toggle, setToggle] = useState({});
   const [agentComplaintList, setAgentComplaintList] = useState([]);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               setUserName(user.name);
               const response = await axios.get(`http://localhost:8000/allcomplaints/${user._id}`);
               setAgentComplaintList(response.data);
               setTimeout(() => setLoaded(true), 100); // smooth entrance
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
   }, [navigate]);

   const handleStatusChange = async (complaintId) => {
      try {
         await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
         setAgentComplaintList((prev) =>
            prev.map((comp) =>
               comp._doc.complaintId === complaintId
                  ? { ...comp, _doc: { ...comp._doc, status: 'completed' } }
                  : comp
            )
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleToggle = (complaintId) => {
      setToggle((prev) => ({
         ...prev,
         [complaintId]: !prev[complaintId],
      }));
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   const styles = {
      navbar: {
         background: 'linear-gradient(270deg, #667eea, #764ba2)',
         animation: 'gradientMove 20s ease infinite',
         backgroundSize: '800% 800%',
         color: '#fff'
      },
      card: {
         width: '18rem',
         margin: '15px',
         boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
         borderRadius: '12px',
         transform: loaded ? 'scale(1)' : 'scale(0.95)',
         opacity: loaded ? 1 : 0,
         transition: 'all 0.5s ease'
      },
      container: {
         display: 'flex',
         flexWrap: 'wrap',
         justifyContent: 'center',
         margin: '20px'
      },
      button: {
         transition: 'all 0.3s ease',
         boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
         border: 'none'
      }
   };

   return (
      <>
         <style>{`
            @keyframes gradientMove {
               0% { background-position: 0% 50%; }
               50% { background-position: 100% 50%; }
               100% { background-position: 0% 50%; }
            }
            .nav-link:hover {
               color: #00f5ff !important;
               transform: scale(1.05);
            }
            button:hover {
               transform: scale(1.05);
               box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
            }
         `}</style>

         <div className="body">
            <Navbar expand="lg" style={styles.navbar}>
               <Container fluid>
                  <Navbar.Brand className="text-white">Hi Agent {userName}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                     <Nav className="me-auto">
                        <NavLink className="nav-link text-white" style={{ textDecoration: 'none' }}>
                           View Complaints
                        </NavLink>
                     </Nav>
                     <Button onClick={LogOut} variant="outline-light">
                        Log out
                     </Button>
                  </Navbar.Collapse>
               </Container>
            </Navbar>

            <div className="container" style={styles.container}>
               {agentComplaintList && agentComplaintList.length > 0 ? (
                  agentComplaintList.map((complaint, index) => {
                     const open = toggle[complaint._doc.complaintId] || false;
                     return (
                        <Card key={index} style={styles.card}>
                           <Card.Body>
                              <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                              <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                              <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                              <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                              <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                              <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                              <Card.Text><b>Status:</b> {complaint._doc.status}</Card.Text>

                              {complaint._doc.status !== 'completed' && (
                                 <Button
                                    onClick={() => handleStatusChange(complaint._doc.complaintId)}
                                    style={styles.button}
                                    variant="success"
                                 >
                                    Status Change
                                 </Button>
                              )}
                              <Button
                                 onClick={() => handleToggle(complaint._doc.complaintId)}
                                 aria-controls={`collapse-${complaint._doc.complaintId}`}
                                 aria-expanded={!open}
                                 className="mx-3"
                                 style={styles.button}
                                 variant="info"
                              >
                                 Message
                              </Button>

                              <Collapse in={!open} dimension="width">
                                 <div id="example-collapse-text">
                                    <Card body style={{ width: '250px', marginTop: '12px' }}>
                                       <ChatWindow key={complaint._doc.complaintId} complaintId={complaint._doc.complaintId} name={userName} />
                                    </Card>
                                 </div>
                              </Collapse>
                           </Card.Body>
                        </Card>
                     );
                  })
               ) : (
                  <Alert variant="info">
                     <Alert.Heading>No complaints to show</Alert.Heading>
                  </Alert>
               )}
            </div>
         </div>

         <Footer style={{ marginTop: '66px' }} />
      </>
   );
};

export default AgentHome;
