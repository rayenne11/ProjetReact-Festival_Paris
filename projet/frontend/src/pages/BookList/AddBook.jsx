// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer,toast } from 'react-toastify';
// import Swal from 'sweetalert2';


// function AddBook() {
//     const [title, setTitle] = useState("");
//     const [author, setAuthor] = useState("");
//     const [code, setCode] = useState("");
//     const [cover, setCover] = useState("");
//     const [error, setError] = useState("");
//     const [showPopup, setShowPopup] = useState(false);
//     const navigate = useNavigate();
 
//   const [book, setBook] = useState(null);
//   const [msg, setMsg] = useState("");

  
//   const [user, setUser] = useState(null);


 
//   const handleClose = () => {
//     setShowPopup(false);
//   };

  

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       console.log("Retrieved user from localStorage:", parsedUser);
//       setUser(parsedUser);
//     } else {
//       console.log("No user found in localStorage");
//     }
//   }, []);




// function createBlog(e){
// e.preventDefault()
//             let newBlog = {title,author,cover,code}
//             fetch("http://localhost:5001/books",{
//                 method:"POST",
//                 headers: {
//                     "content-type":"application/json",
//                 },
//                 body : JSON.stringify(newBlog)
//             })
//             .then(res=>res.json())
//             .then(data=>{
//                 if(data.message){
                   
//                 }else{
                    
//                     setAuthor("")
//                     setCode("")
//                     setCover("")
//                     setTitle("")

//                 }
//             })
            
                  
        
//     }

    


   

    
      
             

//     return (
//       <div className="popup" style={{ display: "block", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#B0E0E6", width: "600px", maxWidth: "80%", height: "auto", borderRadius: "10px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)", padding: "20px" }}>
//         <div className="popup-inner">
//           <button className="close-btn" style={{borderRadius: "50%",
//           backgroundColor: "red",
//           color: "white",
//           float: "right",
//           marginRight: "40px",
//           border: "none",
//           cursor: "pointer"}} onClick={handleClose}> X </button>
//           <h1>Title</h1>
//           <input type="text" value={title} style={{borderRadius:"6px"}}   onChange={(e)=>setTitle(e.target.value)} />
//           <h1>Author</h1>
//           <input type="text" value={author} style={{borderRadius:"6px"}}   onChange={(e) => setAuthor(e.target.value)} />
//           <h1>Code</h1>
//           <textarea value={code}  onChange={(e) => setCode(e.target.value)} />
//           <h1>Image</h1>
//           <input type="text" value={cover} style={{borderRadius:"6px"}}  onChange={(e) => setCover(e.target.value)} />
//           <button type="submit" onClick={createBlog} style={{borderRadius: "25px", fontFamily: "Playfair Display, sansSerif", backgroundColor: "#00BFFF",color: "white",fontSize: "18px",border: "none",width: "100px",display: "block",margin:" 15px auto",padding: "15px 0",cursor: "pointer"}}>Submit</button>
//         </div>
//       </div>
//     );
//   }
//   export default AddBook


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



  


export default function AddBook({ handleClose}) {
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [code, setCode] = useState("");
    const [cover, setCover] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();



   
    let {id}  = useParams();
    function createBlog(e){
        e.preventDefault()
                    let newBlog = {title,author,cover,code}
                    fetch("http://localhost:5001/books",{
                        method:"POST",
                        headers: {
                            "content-type":"application/json",
                        },
                        body : JSON.stringify(newBlog)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.message){
                           
                        }else{
                          
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your book has been saved",
                                showConfirmButton: false,
                                timer: 1500
                              }).then(
                                handleClose(),
                                setTimeout(()=>window.location.reload(),1000)
            
                              )
                            
                            
                            
                            setAuthor("")
                            setCode("")
                            setCover("")
                            setTitle("")
        
                        }
                    })
                    
                          
                
            }
         
    

    useEffect(()=>{
      fetch(`http://localhost:5001/books`)
      .then(res=>res.json())
      .then(data=>{
        setTitle(data.title);
        setAuthor(data.author)
        setCover(data.cover)
        setCode(data.code)
      })
    },[])







    return (
        <div style={{display:"block"}}>
      <div className="popup" style={{ display: "block", position: "fixed", top: "50%", left: "50%",zIndex: '1', transform: "translate(-50%, -50%)", backgroundColor: "#B0E0E6", width: "600px", maxWidth: "80%", height: "auto", borderRadius: "10px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)", padding: "20px" }}>
        <div className="popup-inner">
          <button className="close-btn" style={{borderRadius: "50%",
          backgroundColor: "red",
          color: "white",
          float: "right",
          marginRight: "40px",
          border: "none",
          cursor: "pointer"}} onClick={handleClose}> &nbsp;X&nbsp; </button>
          <h1>Title</h1>
          <input type="text" style={{borderRadius:"6px"}} placeholder="change here"  onChange={(e)=>setTitle(e.target.value)} />
          <h1>Author</h1>
          <input type="text" style={{borderRadius:"6px"}} placeholder="change here"  onChange={(e) => setAuthor(e.target.value)} />
          <h1>Code</h1>
          <textarea  placeholder="change here" onChange={(e) => setCode(e.target.value)} />
          <h1>Image</h1>
          <input type="text" placeholder="change here" style={{borderRadius:"6px"}}  onChange={(e) => setCover(e.target.value)} />
          <button type="submit" onClick={createBlog} style={{borderRadius: "25px", fontFamily: "Playfair Display, sansSerif", backgroundColor: "#00BFFF",color: "white",fontSize: "18px",border: "none",width: "100px",display: "block",margin:" 15px auto",padding: "15px 0",cursor: "pointer"}}>Submit</button>
        </div>
      </div>
      </div>
    );
  };