
import React from 'react';
import { useState, useEffect, Component } from "react";
import logo from '../logo.svg';
import '../App.css';
import "../App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
// import { Modal } from 'react-bootstrap'

import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
const PORT = 5000;
const DB_HOST = "localhost";



const Category = (props) => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // const [name,setCategoryName]=useState('');
  const [modal, setModal] = useState(false);
//  const [errors,setErrors]=useState({});

  useEffect(() => {
    setInterval(() => axios.get(`http://${DB_HOST}:${PORT}/categories`).then((res) => {
      setMessages(res.data);
      // console.log(res.data);
      res.data.map(msg => {
        // console.log(msg);
        messages.push(msg);
      });
    }), 5 * 1000);
  }
    , []);

  const modalOpen = () => {
    setModal(true);
  }

  const modalClose = () => {
    setModal(false);
  }
  const handleChange = (e) => {
    const { target: { value } } = e;
    setInput(value);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let errors = {};
    if (input.match(/^[a-zA-Z]+$/)) {
      let oldCategory = messages.filter((cat) => (cat.name === input)).map(filtered => { return filtered.name; })
      // console.log(oldCategory);

      if (oldCategory.length <= 0) {
        let res = await axios.post(`http://${DB_HOST}:${PORT}/categories`, { name: input }

        ).then(() => { setInput(''); });
      }
      else if (oldCategory)
        console.log('Category already exists');
      // console.log(res.data);
      // else          
      //    errors[input] = "Cannot be empty";

      modalClose();
    }
  
  }

  const handleDelete = async (id) => {

    let res = await axios.delete(`http://${DB_HOST}:${PORT}/categories/` + id);

    // console.log(res.data);
  }

  const handleEdit = async (id) => {

    let oldCategory = messages.filter((cat) => (cat._id === id)).map(filtered => { return filtered.name; })
    // console.log(oldCategory);
    let category = prompt('edit category', oldCategory);
    // console.log(category);
    if (category.match(/^[a-zA-Z]+$/)) {
      if (category === oldCategory) {
        let res = await axios.patch(`http://${DB_HOST}:${PORT}/categories/` + id, { name: category });
        // console.log(res.data);
        // console.log(messages);
      }
      else if (category === null || category === "") {
        console.log('Can not  change to this category name');
        await axios.patch(`http://${DB_HOST}:${PORT}/categories/` + id, { name: oldCategory });
      }
      else {
        await axios.patch(`http://${DB_HOST}:${PORT}/categories/` + id, { name: category });
      }
    }
  }


  return (

    <div className="App">

      {/* <p>
        <strong>ADD New Category</strong>
      </p>
       */}
      <button variant="primary" onClick={() => modalOpen()}>
        Add New Category
      </button>

      <Modal show={modal} onHide={() => modalClose()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Enter Category:</label>
            <input
              type="text"
              value={input}
              name="modalInputName"
              onChange={e => handleChange(e)}
              className="form-control"
              size="30" placeholder="Name"
            />
            {/* <span style={{color: "red"}}>{errors["name"]}</span> */}

          </div>

        </Modal.Body>
        <Modal.Footer>
          <div className="form-group">
            <button variant="secondary" onClick={e => handleSubmit(e)} type="button">
              Save
            </button>
            <button variant="secondary" onClick={() => modalClose()}>
              Close
          </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* <form id="form" onSubmit={handleSubmit}>
        <input type="text" name="content" onChange={handleChange} value={input} />
        <button type="submit">Send</button>
      </form> */}
      <div>
        <table>
          <tr>
            <th scope="col">Category Index</th>
            <th scope="col">Category Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>

          </tr>

          {
            messages.map((message, index) => <tr key={message._id}><td>{index + 1}</td> <td>{message.name}</td>
              <td><button type="button" onClick={() => { handleEdit(message._id) }} class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                Edit
              </button>
              </td>
              <td>
                <button type="button" onClick={() => { handleDelete(message._id) }} class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
                  Delete
              </button>
              </td>

            </tr>)
          }

        </table>
      </div>


    </div>
  );
}


export default Category;

