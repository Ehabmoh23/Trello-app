import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { tokenContext } from "../../Context/tokenContext";
export default function Login()  {
    let navigate = useNavigate();
    const[isLoading,setIsLoading] = useState(false);
    const[apiError,setApiError] = useState("");
    let {setToken}= useContext(tokenContext);

    function signin(values) {
      setIsLoading(true);
      axios.post(`https://trelloapp.onrender.com/login`, values)
        .then((response) => {
          if (response.data && response.data.message === `welcome` && response.data.token) {
            localStorage.setItem("userToken", response.data.token);
            console.log(response.data)
            setToken(response.data.token);
            setIsLoading(false);
            navigate("/");
          } else {
            setIsLoading(false);
            setApiError("Login failed. Please check your credentials.");
          }
        })
        .catch((err) => {
          if (err.response) {
            setApiError(err.response.data.message);
          } else {
            setApiError("Network error. Please try again later.");
          }
          setIsLoading(false);
        });
    }
    

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('email is Required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"password should start with capital").required('password is Required'),
      });
    

      let formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },validationSchema,
        onSubmit: (values) => {
          signin(values)
        }
      });
      return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Login 
                    </p>
                    {apiError ? <div className="alert alert-danger">{apiError}</div>:""}
                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline form-group flex-fill mb-0">
                          <label htmlFor="email">userEmail</label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <div className="alert alert-danger">
                              {formik.errors.email}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline form-group  flex-fill mb-0">
                          <label htmlFor="password">password</label>
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <div className="alert alert-danger">
                              {formik.errors.password}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                type="submit"
                className="btn nav-bg text-white d-block mx-auto"
              >
            {isLoading ? <i className="fa fa-spin fa-spinner" /> : <> <i className="far fa-edit" /> Login</>} 
              </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Illustration of a registration process"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      );
}
