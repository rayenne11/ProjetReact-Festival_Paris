import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import Swal from 'sweetalert2';



export default function UpdatePopup({ handleClose , book}) {
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    console.log(book);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [code, setCode] = useState("");
    const [cover, setCover] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
      


   
    let {id}  = useParams();
    function editBlog(e){
        e.preventDefault()
        let newBlog = {title,author,cover,code}
        fetch(`http://localhost:5001/books/${id}`,{
            method:"PUT",
            headers: {
                "content-type":"application/json",
            },
            body : JSON.stringify(newBlog)
        })
        .then(res=>res.json())
        .then(data=>{
            if(!data.message){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  }).then(
                    navigate('/books')

                  )

                
                setAuthor("")
                setCode("")
                setCover("")
                setTitle("")
            }else{
                toast.error(data.message)
                

            }
        })
    } 
         
    

    useEffect(()=>{
      fetch(`http://localhost:5001/books/${id}`)
      .then(res=>res.json())
      .then(data=>{
        setTitle(data.title);
        setAuthor(data.author)
        setCover(data.cover)
        setCode(data.code)
      })
    },[])







    return (
      <div className="popup" style={{ display: "block", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#B0E0E6", width: "600px", maxWidth: "80%", height: "auto", borderRadius: "10px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)", padding: "20px" }}>
        <div className="popup-inner">
          <button className="close-btn" style={{borderRadius: "50%",
          backgroundColor: "red",
          color: "white",
          float: "right",
          marginRight: "40px",
          border: "none",
          cursor: "pointer"}} onClick={handleClose}> &nbsp;X&nbsp; </button>
          <h1>Title</h1>
          <input type="text" style={{borderRadius:"6px"}}   onChange={(e)=>setTitle(e.target.value)} />
          <h1>Author</h1>
          <input type="text" style={{borderRadius:"6px"}}   onChange={(e) => setAuthor(e.target.value)} />
          <h1>Code</h1>
          <textarea   onChange={(e) => setCode(e.target.value)} />
          <h1>Image</h1>
          <input type="text" style={{borderRadius:"6px"}}  onChange={(e) => setCover(e.target.value)} />
          <button type="submit" onClick={editBlog} style={{borderRadius: "25px", fontFamily: "Playfair Display, sansSerif", backgroundColor: "#00BFFF",color: "white",fontSize: "18px",border: "none",width: "100px",display: "block",margin:" 15px auto",padding: "15px 0",cursor: "pointer"}}>Submit</button>
        </div>
      </div>
    );
  };













  