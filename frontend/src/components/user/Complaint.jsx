import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'))
   const [mounted, setMounted] = useState(false)
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
   })

   useEffect(() => {
      setMounted(true)
   }, [])

   const handleChange = (e) => {
      const { name, value } = e.target
      setUserComplaint({ ...userComplaint, [name]: value })
   }

   const handleClear = () => {
      setUserComplaint({
         userId: '',
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: '',
         comment: ''
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const user = JSON.parse(localStorage.getItem('user'))
      const { _id } = user
      axios.post(`http://localhost:8000/Complaint/${_id}`, userComplaint)
         .then(res => {
            alert("Your Complaint has been sent!!")
            handleClear()
         })
         .catch(err => {
            console.log(err)
            alert("Something went wrong!!")
         })
   }

   const styles = {
      formContainer: {
         padding: "2rem",
         width: "100%",
         maxWidth: "800px",
         borderRadius: "20px",
         background: "rgba(255,255,255,0.05)",
         backdropFilter: "blur(12px)",
         boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
         transform: mounted ? "translateY(0)" : "translateY(50px)",
         opacity: mounted ? 1 : 0,
         transition: "all 1s ease",
         color: "#fff"
      },
      input: {
         background: "rgba(255,255,255,0.1)",
         color: "#fff",
         border: "none",
         borderRadius: "8px"
      },
      label: {
         color: "#ccc",
         marginBottom: "0.3rem"
      },
      textarea: {
         background: "rgba(255,255,255,0.1)",
         color: "#fff",
         borderRadius: "10px",
         height: "120px",
         padding: "1rem",
         border: "none"
      },
      button: {
         padding: "10px 25px",
         fontSize: "1rem",
         fontWeight: "bold",
         borderRadius: "8px",
         border: "none",
         background: "linear-gradient(135deg, #43e97b, #38f9d7)",
         color: "#000",
         cursor: "pointer",
         boxShadow: "0 0 15px rgba(0,255,255,0.3)",
         transition: "all 0.3s ease"
      }
   }

   return (
      <>
         <style>
            {`
               .form-control:focus {
                  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                  border: none;
               }
               button:hover {
                  transform: scale(1.05);
                  box-shadow: 0 0 25px rgba(0,255,255,0.6);
               }
            `}
         </style>

         <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#121212" }}
         >
            <form
               onSubmit={handleSubmit}
               className="row"
               style={styles.formContainer}
            >
               <div className="col-md-6 p-3">
                  <label htmlFor="name" style={styles.label}>Name</label>
                  <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" style={styles.input} required />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="address" style={styles.label}>Address</label>
                  <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" style={styles.input} required />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="city" style={styles.label}>City</label>
                  <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" style={styles.input} required />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="state" style={styles.label}>State</label>
                  <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" style={styles.input} required />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="pincode" style={styles.label}>Pincode</label>
                  <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="text" className="form-control" style={styles.input} required />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="status" style={styles.label}>Status</label>
                  <input placeholder='type "pending"' name="status" onChange={handleChange} value={userComplaint.status} type="text" className="form-control" style={styles.input} required />
               </div>

               <div className="col-12 p-3">
                  <label htmlFor="comment" style={styles.label}>Description</label>
                  <textarea name="comment" onChange={handleChange} value={userComplaint.comment} className="form-control" style={styles.textarea} required></textarea>
               </div>

               <div className="text-center col-12 p-3">
                  <button type="submit" style={styles.button}>
                     Register
                  </button>
               </div>
            </form>
         </div>
      </>
   )
}

export default Complaint
