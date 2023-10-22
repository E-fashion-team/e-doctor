"use client";

import "./style.css";
import React from "react";
import icon from "../../../images/successfulPayment.png";
import Image from "next/image";
import Link from "next/link";

const Success = () => {
  return (
    <div id="successPaymentPage">
      <div>
        <Image src={icon} alt="icon" className="successIcon" />
      </div>
      <div className="paymentSuccessfulHeaders">
        <h1>Thank You!</h1>
        <h4>Payment done Successfully</h4>
      </div>
      <Link href="/">
        <button className="homePageButton">Home</button>
      </Link>
    </div>
  );
};

export default Success;
