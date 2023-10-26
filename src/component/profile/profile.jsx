import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/apiSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from "axios";
import jwtDecode from 'jwt-decode';

export default function Profile() {
  const token = localStorage.getItem("userToken")
  const decoded = jwtDecode(token)
  let { userData } = useSelector((state) => state.apiCall)
  const dispatch = useDispatch()
  // const phoneRegExp = /^01[0125][0-9]{8}$/;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [apiErr, setApiErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function updateUser(values) {
    try {
      const response = await axios.put(
        `https://trelloapp.onrender.com/updateUser/${userData._id}`,
        values,
      );

      if (response.data.message === "User data updated") {
        setIsLoading(false);
        setShow(false);
        dispatch(getUserData(decoded.id))
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        console.log(err.response.data.error.message);
        setApiErr(err.response.data.error.message);
      } else {
        console.log(err.message); // Log the general error message
        setApiErr(err.message);
      }

      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      userName: userData.userName,
      phone: userData.phone,
      age: userData.age
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(3, " must be at least 3 character")
        .max(30, " must be less than 30 character"),

      age: yup.number().positive().integer(),

      phone: yup
        .string()
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      updateUser(values)
    }
  })
  
  useEffect(() => {
    dispatch(getUserData(decoded.id))
    console.log(userData)
  }, [decoded.id,dispatch])
  useEffect(() => {
  }, [userData])
  return (
    <div className='bg-profile'>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 my-4 bg-white rounded-3 shadow-lg">
            <div className="my-4 text-center">
              <img
                className="mx-auto my-2 h-32 w-32 rounded-full border-4 border-white "
                src={
                  userData?.gender === "male"
                    ? "male-avatar.jpg"
                    : "female-avatar.jpg"
                }
                alt="male-avatar"
              />

              <div className="py-2 ms-0">
                <h3 className="mb-1 text-2xl font-bold ">
                  Name: {userData?.userName}
                </h3>
                <div className="inline-flex items-center ">
                  <ul className="flex flex-col list-style-none ms-0 ps-0">
                    <li>
                      <span className="font-bold">
                        Phone:
                      </span>{" "}
                      {userData?.phone}
                    </li>
                    <li>
                      <span className="font-bold">
                        Age:
                      </span>{" "}
                      {userData?.age}
                    </li>
                    <li>
                      <span className="font-bold">
                        Gender:
                      </span>{" "}
                      {userData?.gender}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='form mb-4'>
              <div className='w-100 d-flex justify-content-center'>
                <Button variant="primary mb-2 w-50 " onClick={handleShow}>
                  Update Profile
                </Button>
              </div>
              <Modal show={show} onHide={handleClose}>
                {apiErr ? <div className="alert alert-danger"></div> : ""}
                <Modal.Header closeButton>
                  <Modal.Title>Updata Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3 mx-2" controlId="formBasicUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control value={formik.values.userName} onBlur={formik.handleBlur} onChange={formik.handleChange} name='userName' type="text" />
                    {formik.touched.userName && formik.errors.userName && (
                      <div className="alert alert-danger my-1">{formik.errors.userName}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 mx-2" controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control value={formik.values.age} onBlur={formik.handleBlur} onChange={formik.handleChange} name='age' type="number" placeholder="Age" />
                    {formik.touched.age && formik.errors.age && (
                      <div className="alert alert-danger my-1">{formik.errors.age}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 mx-2" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' type="number" placeholder="Phone" />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="alert alert-danger my-1">{formik.errors.phone}</div>
                    )}
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type='submit'>
                      {isLoading ? <i className="fa fa-spin fa-spinner" /> : <> <i className="far fa-edit" /> Save Change</>}                     </Button>
                  </Modal.Footer>
                </Form>

              </Modal>
            </div>

          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

    </div>
  );
};