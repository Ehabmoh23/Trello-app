import axios from 'axios';
import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

export default function TodoForm() {
  const [apiErr, setApiErr] = useState('');
  const userToken = localStorage.getItem('userToken');
  const decoded = jwtDecode(userToken);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  async function addTask(values) {
    try {
      // Add todo
      const response = await axios.post('https://trelloapp.onrender.com/addTask', values, {
        headers: { authorization: `Bearer ${userToken}` },
      });
      setIsLoading(true)
      if (response.data.message === 'task added successfully') {
        console.log('Task added successfully');
        setIsLoading(false)
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        console.log(err.response.data.error.message);
        setApiErr(err.response.data.error.message);
        setIsLoading(false)

      } else {
        console.log(err.message);
        setApiErr(err.message);
        setIsLoading(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      des: '',
      status: '',
      deadline: '',
      userId: decoded._id,
    },
    validationSchema: yup.object({
      title: yup.string().min(3, 'Must be at least 3 characters').max(30, 'Must be less than 30 characters'),
      des: yup.string().required("description is required").min(10, 'Must be at least 10 characters').max(80, 'Must be less than 80 characters'),
      status: yup.string().oneOf(['toDo', 'doing', 'done'], 'Invalid state'),
      deadline: yup.date().typeError('Please enter a valid date').required('Deadline is required'),
    }),
    onSubmit: async (values) => {
      await addTask(values);
      setShow(false)
      setIsLoading(false)
      // Reset the form or perform other actions after submitting
      formik.resetForm();
    },
  });

  return (
    <>
      <div className='form mb-4'>
        <div className='w-100 d-flex justify-content-center'>
          <Button variant="primary mb-2" onClick={handleShow}>
            Add New Task
          </Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          {apiErr ? <div className="alert alert-danger"></div> : ""}
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 mx-2" controlId="formBasicUserName">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="title"
                className="todo-input"
                placeholder="Title" />
              {formik.touched.title && formik.errors.userName && (
                <div className="alert alert-danger my-1">{formik.errors.userName}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3 mx-2" controlId="formBasicAge">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name='des'
                type="text"
                placeholder="Description" />
              {formik.touched.des && formik.errors.des && (
                <div className="alert alert-danger my-1">{formik.errors.des}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3 mx-2" controlId="formBasicPhone">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={formik.values.status}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name='status'
                className="todo-input"
                placeholder='State (toDo, doing, or done)' />
              {formik.touched.status && formik.errors.status && (
                <div className="alert alert-danger my-1">{formik.errors.status}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3 mx-2" controlId="formBasicPhone">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={formik.values.deadline}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name='deadline'
                className="todo-input"
                placeholder='Deadline' />
              {formik.touched.deadline && formik.errors.deadline && (
                <div className="alert alert-danger my-1">{formik.errors.deadline}</div>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type='submit'>
                {isLoading ? <i className="fa fa-spin fa-spinner" /> : <> <i className="far fa-edit" /> Save Change</>}</Button>
            </Modal.Footer>
          </Form>

        </Modal>
      </div>
    </>
  );
}
