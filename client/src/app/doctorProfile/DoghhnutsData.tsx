import './style.css'
import React from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

Chart.register(ArcElement, Tooltip, Legend, Title);



function CreateDoughnutData() {
    const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
    const appointments = doctor.Appointments

    const data = {

        datasets: [
            {
                data: [
                    appointments?.filter((appo: any) => appo.Patient.gender === "male").length
                    ,
                    appointments?.filter((appo: any) => appo.Patient.gender === "female").length
                ],
                backgroundColor: [
                    'orange',
                    'rgb(26, 88, 244)',

                ],
                hoverBackgroundColor: [
                    'orange',
                    'rgb(26, 88, 244)',

                ]
            }],
        labels: [],


    };
    return (
        <div className='DoctorProfile-donut' >
            <Doughnut data={data} />
        </div>
    );
}

export default CreateDoughnutData;