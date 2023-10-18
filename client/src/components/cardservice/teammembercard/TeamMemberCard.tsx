
import React from 'react'
import bgUser from "../../assets/images/BG.png"

interface prpos {
    doctor: any
}

const TeamMember = ({ doctor }: prpos) => {
    return (
        <div style={{ width: "25rem" }} className="card-service-container d-flex flex-column align-items-center  gap-3">
            <div style={{ width: "22rem", height: "20rem" }}>
                <img style={{ width: "90%", height: "90%",objectFit:"cover",borderRadius:"50%" }} src={doctor.avatarUrl} />
            </div>
            <span style={{ color: "#007E85", fontSize: "1.5rem", fontWeight: "700" }}>Dental treatments</span>
            <p
                style={{ color: "#555", fontWeight: "400", fontSize: "1rem" }}
            >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus odio totam vel blanditiis? Aliquid sapiente eos, aut molestiae expedita, consequatur eum saepe obcaecati blan
                ditiis non perferendis, illo qui iusto vitae.</p>
        </div>
    )
}

export default TeamMember