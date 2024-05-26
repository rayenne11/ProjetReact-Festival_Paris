import React, { useState } from "react";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

function Contact() {
  const user = useSelector((s) => s.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    api: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "email", "message"];
    const errors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      // Reset form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        
       
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      }).then(
        handleClose(),
    

      )
      window.location.reload();
      setErrors({});
    } catch (error) {
      console.log(error);
      
    }
    
  };
  return (
    <div className="font-[sans-serif] max-w-6xl mx-auto relative bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden m-20">
      <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-blue-400"></div>
      <div className="absolute -bottom-6 -left-0 w-24 h-20 rounded-tr-[40px] bg-teal-200"></div>
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400"></div>
      <div className="absolute -bottom-6 -right-0 w-24 h-20 rounded-tl-[40px] bg-blue-300"></div>
      <div className="grid md:grid-cols-2">
        {errors.api && <ErrorAlert msg={errors.api} setShow={errors.api} />}
        <div className="text-center p-6 xl:p-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl text-blue-500 font-bold">Contact Us</h2>
          <img
            src="https://readymadeui.com/contact.webp"
            className="mt-4 shrink-0 w-full"
          />
        </div>
        <form className="p-6 xl:p-10" onSubmit={handleSubmit}>
          <div className="max-w-sm mx-auto space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-gray-100 rounded-full py-3 px-6 text-sm outline-none"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-100 rounded-full py-3 px-6 text-sm outline-none"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
            <input
              type="tel"
              placeholder="Phone No."
              className="w-full bg-gray-100 rounded-full py-3 px-6 text-sm outline-none"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
            <textarea
              placeholder="Message"
              rows="6"
              className="w-full bg-gray-100 rounded-3xl px-6 text-sm pt-3 outline-none"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs">{errors.message}</p>
            )}
            <button
              type="submit"
              className="text-white w-full relative bg-blue-500 hover:bg-blue-600 font-semibold rounded-full text-sm px-6 py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                className="mr-2 inline"
                viewBox="0 0 548.244 548.244"
              >
                <path
                  fillRule="evenodd"
                  d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                  clipRule="evenodd"
                  data-original="#000000"
                />
              </svg>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
