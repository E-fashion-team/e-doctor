import React, { useEffect } from "react";
import './review.css'
import OneReviewComponent from "./OneReviewComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getReviewsByDocId } from "../../store/doctorSlice";

const YasBar = () => {
    const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo);
    const allReviwes: any = useSelector((state: RootState) => state.doctor.allReviwes);
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getReviewsByDocId(doctor.id))
    }, [])

    return (
        <div className="grid-father-yas">
            <div className="yasbar-cont grid-item-yas">
                <div className="element-of-yasbar">
                    <h5 className="hover-button-yassine  grid-item-yas">My Profile</h5>
                    <h5 className="hover-button-yassine  grid-item-yas">Change Password</h5>
                    <h5 className="hover-button-yassine  grid-item-yas">Notification</h5>
                    <h5 className="hover-button-yassine  grid-item-yas">Reviews</h5>
                </div>
            </div><br />
            <div className="static-review-h1">
                <h5>Reviews</h5>
            </div>
            <div className="all-yas-review-wrapper gap-1">
                {allReviwes.length > 1 ? allReviwes.map((review:object,i:number) =><OneReviewComponent key={i} review={review} />) : <h1>No Reviwes Yet</h1>}
            </div>

        </div>


    )
}
export default YasBar;