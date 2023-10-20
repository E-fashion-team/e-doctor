import React from 'react'

interface props {
    review: any
}

const OneReviewComponent = ({ review }: props) => {
    return (
        <div className="user-review-yas mt-2 p-4" style={{width:"50rem"}}>
            <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="d-flex justify-content-center user-review-image p-2">
                    <div className='align-items-center jutstify-content-center' style={{ display: "flex", gap: "0.5rem" }}>
                        <img src={review.Patient.avatarUrl}
                            className="rounded-circle shadow-1-strong" width="40" height="40" />
                        <div style={{ display: "flex align-items-center", flexDirection: "column" }}>
                            <p style={{ fontWeight: "bold" }}>{review.Patient.name}</p>
                            {/* <p style={{ fontSize: "10px" }}>3emel yawmy</p> */}
                        </div>
                    </div>
                </div>
                <div className="stars-date" style={{ display: "flex", flexDirection: "column" }} >
                    <ul className="list-unstyled d-flex justify-content-center text-warning mb-3" >
                        {/* {review.rate} */}
                        <li><i className={review.rate >=1?"fas fa-star fa-sm":"far fa-star fa-sm"}></i></li>
                        <li><i className={review.rate >=2?"fas fa-star fa-sm":"far fa-star fa-sm"}></i></li>
                        <li><i className={review.rate >=3?"fas fa-star fa-sm":"far fa-star fa-sm"}></i></li>
                        <li><i className={review.rate >=4?"fas fa-star fa-sm":"far fa-star fa-sm"}></i></li>
                        <li><i className={review.rate >=5?"fas fa-star fa-sm":"far fa-star fa-sm"}></i></li>
                    </ul>
                    <p style={{ fontSize: "10px", marginTop: "-15px" }}>{review.createdAt.slice(0,10)}</p>
                </div>
            </div>
            <div className="message-costumer">
                <p>{review.content}</p>
            </div>
        </div >
    )
}

export default OneReviewComponent