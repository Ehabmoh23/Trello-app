import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  // const responseSuccessGoogle = (res) => {
  //   console.log(res)
  // }

  function signup(values) {
    values.userName = values.name;
    delete values.name;
    setIsLoading(true);
    axios
      .post(`https://trelloapp.onrender.com/register`, values)
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.message === "regiterd done"
        ) {
          setIsLoading(false);
          navigate("/login");
        } else {
          setApiError(response.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          setApiError(err.response.data.error);
        } else {
          setApiError("Network error. Please try again later.");
        }
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(3, "Must be 3 characters or more")
      .required("name is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("email is Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "password should start with capital")
      .required("password is Required"),
    phone: Yup.string()
      .min(10, "Must be more than 10 characters")
      .required("This field is requrieed"),
    age: Yup.number().required("is requried").positive().integer(),
    gender: Yup.string().min(2, "Must be more than 10 characters").nullable(),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      age: 0,
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signup(values);
    },
  });

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100 my-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    {apiError ? (
                      <div className="alert alert-danger">{apiError}</div>
                    ) : (
                      ""
                    )}
                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline form-group flex-fill mb-0">
                          <label htmlFor="name">userName</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.name && formik.touched.name ? (
                            <div className="alert alert-danger">
                              {formik.errors.name}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
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
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline form-group flex-fill mb-0">
                          <label htmlFor="phone">phone</label>
                          <input
                            type="tel"
                            id="phone"
                            className="form-control"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.phone && formik.touched.phone ? (
                            <div className="alert alert-danger">
                              {formik.errors.phone}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline form-group flex-fill mb-0">
                          <label htmlFor="age">Age</label>
                          <input
                            type="number"
                            id="age"
                            className="form-control"
                            name="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.age && formik.touched.age ? (
                            <div className="alert alert-danger">
                              {formik.errors.age}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline form-group flex-fill mb-0">
                          <label htmlFor="gender">gender</label>
                          <input
                            type="text"
                            id="gender"
                            className="form-control"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.gender && formik.touched.gender ? (
                            <div className="alert alert-danger">
                              {formik.errors.gender}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn nav-bg text-white d-block mx-auto mb-4"
                        >
                          {isLoading ? (
                            <i className="fa fa-spin fa-spinner" />
                          ) : (
                            <>
                              {" "}
                              <i className="far fa-edit" /> Register
                            </>
                          )}
                        </button>
                        {/* <div className="my-2">
                          <GoogleLogin
                            clientId="5410326615-troth5nmgkj605ncikksl35icf90vp0i.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseSuccessGoogle}
                            cookiePolicy={'single_host_origin'}
                          />
                        </div> */}
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
