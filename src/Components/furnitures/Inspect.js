import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Inspect({isScrolled}) {
    const [furniture, setFurniture] = useState({});
    
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://haus-db.onrender.com/furnitures/${id}`);
            const data = await response.json();
            setFurniture(data);
          };
          fetchData();
      },[])

      return ( 
        <div className='inspect-container'>
            <div className={`inspect-info-container flex-box grey-background ${isScrolled ? 'add-dropshadow' : ''}`}>
                <div className='inspect-furniture-container flex-box'>
                    <div className='inspect-furniture'>
                        <h1 className={furniture.name && furniture.name.length > 13 ? 'small-font' : 'big-font'}>
                            {furniture.name}
                        </h1>
                        <p>USD {furniture.price && furniture.price.toLocaleString()}</p>
                    </div>

                    <div className='add-to-cart flex-box'>
                        <i className='bx bx-plus'></i>
                        <p>Add to Cart</p>
                    </div>
                </div>

                <div className='furniture-designer'>
                    <p>{furniture.designer}</p>
                </div>
            </div>

            <div className='inspect-imgs-container flex-box'>
                <div className='inspect-img-container'>
                    <img src={furniture.image && furniture.image.angle1} alt='image' />
                </div>

                <div className='inspect-img-container'>
                    <img src={furniture.image && furniture.image.angle2} alt='image' />
                </div>

                <div className='inspect-img-container'>
                    <img src={furniture.image && furniture.image.angle3} alt='image' />
                </div>
            </div>

            <div className='inspect-details-container'>
                <div className='inspect-detail flex-box'>
                    <p>Material</p>
                    <p>{furniture.material}</p>
                </div>

                <div className='inspect-detail flex-box'>
                    <p>Dimensions</p>
                    <p>{furniture.dimensions}</p>
                </div>

                <div className='inspect-detail flex-box'>
                    <p>Origin</p>
                    <p>{furniture.origin}</p>
                </div>
            </div>

            <div className='subpages-footer-container'>
                <Footer />
            </div>
        </div>
      )
    
      
}