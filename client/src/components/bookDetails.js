import React, { useEffect, useState } from 'react'
import BooksServices from "../services/booksServices"
import BookShelve from './BookShelves'
import RateBook from './RateBook'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import AddBookReview from './AddBookReview';

const BookDetails = ({ match: { params: { id: bookId } } }) => {
  
    const [book, setBook] = useState([])
    const [shelf, setShelf] = useState("")
    const [reviewAdded, setReviewAdded] = useState(false)
    const [userRate, setUserRate] = useState(0)
    const [averageRating, setAverageRating]=useState(0)


    useEffect(() => {
        BooksServices.getBookDetails(bookId).then((res) => {
            setBook(res.data)
            setShelf(res.data.shelf ? res.data.shelf.shelf : "read")
            let sum = 0;
            res.data.book.ratings.forEach((a) => {                    
                sum += a.rating
            })
            res.data.book.ratings.length &&
            setAverageRating(sum/res.data.book.ratings.length)
            
        })
    }, [])

    useEffect(() => {
        BooksServices.getBookDetails(bookId).then((res) => {
            setBook(res.data)
            setShelf(res.data.shelf ? res.data.shelf.shelf : "read")
            let sum = 0;
            res.data.book.ratings.forEach((a) => {                    
                sum += a.rating
            })
            setAverageRating(sum/res.data.book.ratings.length)
          
        })
    }, [reviewAdded, userRate])


    const changeBookRate = (id, rateValue) => {
        let tempBook = { ...bookDetails }
        tempBook.ratings = bookDetails.ratings.map((rate) => {            
            if (rate.user === JSON.parse(localStorage.getItem('user')).id) {
                return { ...rate, rating: rateValue }
            }
            return rate
        })
        tempBook.ratings.length === 0 && tempBook.ratings.push({ _id: id, user: JSON.parse(localStorage.getItem('user')).id, rating: rateValue });
        setUserRate(rateValue)
        setBook(({ book: tempBook }))
    }

    const changeBookState = (bookId, shelf) => {
        setShelf(shelf)
    }

    let { book: bookDetails } = book
 
    
    return (
        <>
            {bookDetails &&
                <>
                  
                    <div className="book-info">
                        <div className="book-info-left">
                            <img className="book-image" src={bookDetails.image_path ? process.env.PUBLIC_URL + "/books-covers/" + bookDetails.image_path : "/112815953-stock-vector-no-image-available-icon-flat-vector.jpg"} />
                            <BookShelve changeBookState={changeBookState} bookId={bookDetails._id} state={shelf} />
                            <RateBook changeBookRate={changeBookRate} key={bookDetails._id} bookId={bookDetails._id} rate={0} />
                        </div>
                        <div className="book-data">
                            <h2>{bookDetails.name}</h2>
                            <h4><Link to={`/authors/${bookDetails.author._id}`}>{`${bookDetails.author.firstName} ${bookDetails.author.lastName}`}</Link></h4>
                            <h4><Link to={`/authors/${bookDetails.category._id}`}>{bookDetails && bookDetails.category.name}</Link></h4>

                            <div className="book-rating">
                                <StarRatings
                                    rating={averageRating}
                                    starRatedColor="goldenrod"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="25px"
                                    starSpacing="3px"
                                />
                                <p>
                                    {averageRating}- {bookDetails.ratings.length} {bookDetails.ratings.length <= 1 ? "rating" : "ratings"}
                                    {/* {bookDetails.ratings.reduce((a, { rating }) => a + rating, 0) / bookDetails.ratings.length || 0} - {bookDetails.ratings.length} {bookDetails.ratings.length <= 1 ? "rating" : "ratings"} */}
                                </p>
                            </div>
                        </div>
                    </div>

                    <AddBookReview
                        bookId={bookId}
                        user={localStorage.getItem('user')}
                        setReviewAdded={setReviewAdded}
                    />
                    <br />
                    <br />
                    <div className="reviews">
                        <h4>Reviews</h4>
                        {bookDetails.reviews.length > 0 ?
                            bookDetails.reviews.map((review) => {
                                return (

                                    <div className="card" style={{ width: "80%" }} key={review._id}>
                                        <div className="card-body">
                                            <div className="ratein-review">

                                                <h5 className="card-title">{review.user.username}  </h5>
                                                {
                                                    bookDetails.ratings.map((rating) => {

                                                        if (rating.user === review.user._id) {
                                                            return (
                                                                <>
                                                                    <p className="ratedit">rated it</p>
                                                                    <StarRatings
                                                                        rating={parseInt(rating.rating)}
                                                                        starRatedColor="goldenrod"
                                                                        numberOfStars={5}
                                                                        name='rating'
                                                                        starDimension="15px"
                                                                        starSpacing="1px"
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                    })

                                                }
                                            </div>
                                            <p className="card-text">{review.review}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            "No reviews found"

                        }
                    </div>
                </>
            }
        </>






    )
}

export default BookDetails