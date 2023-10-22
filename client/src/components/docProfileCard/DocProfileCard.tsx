"use client";
import image from "../../images/profileIMG.jpg";
import React from "react";
import "./style.css";
import Image from "next/image";

const DocProfileCard = () => {
  return (
    <div>
      <div className="allCard">
        <div className="card">
          <Image className="profileImg" src={image} alt="" />
          <div className="ittemm">
            <h1 className="docName"> Dr.Stephen conley</h1>
            <h3>Cardiologist</h3>
            <button className="buttProfile">Edit Profile</button>

            <h4 className="rateNum">146 Rates</h4>
            <div className="rating">
              <input type="radio" name="rating" value="5" id="5" />
              <label>☆</label>
              <input type="radio" name="rating" value="5" id="4" />
              <label>☆</label>
              <input type="radio" name="rating" value="5" id="3" />
              <label>☆</label>
              <input type="radio" name="rating" value="5" id="2" />
              <label>☆</label>
              <input type="radio" name="rating" value="5" id="1" />
              <label>☆</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocProfileCard;
