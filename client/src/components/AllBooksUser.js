
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';
import Carousel from 'react-elastic-carousel';

const AllBooksUser=(props)=>  {
    
    const API_URL = process.env.REACT_APP_API_URL+"/books/";
    const [books, setBooks] = useState([]);
    
    useEffect(()=>{    // get all books
        axios.get(API_URL, {headers: authHeader()})                                                                 
        .then(response => {
            setBooks(response.data)
        })
        .catch(err => {
            if(err.response) {
                if(err.response.status === 404) {
                    setBooks([]);
                }
            }
        })

    }, []);

    
    return (
        books.length > 0 ?
        (<Carousel style={{marginTop: "120px", height: "25rem"}} className="container justify-content-center" itemsToShow={3} itemsToScroll={3}>
            {
                books.map(book => {
                    return(
                        <div className="card mb-2 mr-3" style={{width: "18rem"}} key={book._id}>
                            <a href="#"><img className="card-img-top" src={book.cover} alt="Book Cover"></img></a>
                            <div className="card-body">
                                <h5 className="card-title"><a href="#">{book.name}</a></h5>
                                <p className="card-text"><a href="#">{`${book.author.firstName} ${book.author.lastName}`}</a></p>
                            </div>
                        </div>
                    )
                })
            }
        </Carousel>)
        : 
        <div className="container d-flex justify-content-center mt-5">
            <h3>No Books Yet.</h3>
        </div>

    );
    
}

export default AllBooksUser