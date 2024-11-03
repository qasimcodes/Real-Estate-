import React from 'react'
import { IoBedOutline } from "react-icons/io5";
import { FaToilet } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";

const AdFeature = ({ ad }) => {
    return (
        <>
            <p className="card-text d-flex justify-content-between">
                {ad.bedrooms ? (
                    <span>
                        <IoBedOutline /> {ad.bedrooms}
                    </span>
                ) : (""
                )}
                {ad.washrooms ? (
                    <span>
                        <FaToilet /> {ad.washrooms}
                    </span>
                ) : (""
                )}
                {ad.carPark ? (
                    <span>
                        <FaCarSide /> {ad.carPark}
                    </span>
                ) : (""
                )}
                {ad.area ? (
                    <span>
                        <MdMapsHomeWork /> {ad.area}
                    </span>
                ) : (""
                )}
            </p>
        </>
    )
}

export default AdFeature
