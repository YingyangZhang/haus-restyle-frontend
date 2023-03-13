import React, { useEffect, useState } from "react";

export default function Home() {
    const [randomImgIndex, setrandomImgIndex] = useState(randomIndex(0, 2))
    const backgroundImg = ['https://haus-imgs.s3.amazonaws.com/backgroud_01.png', 'https://haus-imgs.s3.amazonaws.com/backgroud_02.png', 'https://haus-imgs.s3.amazonaws.com/backgroud_03.png'];

    function randomIndex(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }   

    const homeBackground = {
        backgroundImage: `url(${backgroundImg[randomImgIndex]})`
    };

    return (
        <div className='home-container' style={homeBackground}>

        </div>
    )
}