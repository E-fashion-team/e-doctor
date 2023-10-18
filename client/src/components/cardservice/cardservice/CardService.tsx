import React from 'react'
import cardService from "../../assets/images/card-service.png"
interface cardServiceProps {
    img: string,
    para: string,
    title: string
}

const CardService = ({ img, para, title }: cardServiceProps) => {
    return (
        <div style={{ width: "27rem" }} className="card-service-container d-flex flex-column  gap-3">
            <div style={{height:"20rem",width:"100%"}}>
                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={img} />
            </div>
            <span style={{ color: "#007E85", fontSize: "1.5rem", fontWeight: "700" }}>{title}</span>
            <p
                style={{ color: "#555", fontWeight: "400", fontSize: "1rem" }}
            >{para}</p>
        </div>
    )
}

export default CardService