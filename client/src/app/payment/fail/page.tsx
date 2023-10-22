"use client";

import "./style.css";
import React from "react";
import icon from "../../../images/failPayment.png";
import Image from "next/image";
import Link from "next/link";

const Fail = () => {
  return (
    <div id="failPaymentPage">
      <div>
        <Image src={icon} alt="icon" className="failIcon" />
      </div>
      <div className="paymentFailfulHeaders">
        <h1>Something Went Wrong!</h1>
        <h4>Please try again later</h4>
      </div>
      <Link href="/">
        <button className="homePageButton">Home</button>
      </Link>
    </div>
  );
};

export default Fail;
