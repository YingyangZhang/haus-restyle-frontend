import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedFurnitures from "./RelatedFurnitures";
import Footer from "../footer/Footer";

export default function Inspect({isScrolled}) {
    const [furniture, setFurniture] = useState({});
    const [relatedFurnitures, setRelatedFurnitures] = useState([]);
    const [isTargetInViewport, setIsTargetInViewport] = useState(false); 
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://haus-db.onrender.com/furnitures/${id}`)
        .then(r => r.json())
        .then(data => {
            setFurniture(data);
        })
    },[id]);

    useEffect(() => {
        fetch('https://haus-db.onrender.com/furnitures')
          .then(r => r.json())
          .then(data => {
            const filteredFurnitures = data.filter(relatedFurniture => {
              return relatedFurniture.category.category_name === furniture.category?.category_name;
            });
            const randomFurnitures = filteredFurnitures.sort(() => Math.random() - 0.5).slice(0, 3);
            setRelatedFurnitures(randomFurnitures);
            console.log(randomFurnitures);
          });
    }, [furniture.category]);

    useEffect(() => {
        function handleScroll() {
          const targetElement = document.querySelector('.related-furnitures-container');
          const targetElementPosition = targetElement.getBoundingClientRect().top;
    
          if (targetElementPosition < window.innerHeight * .7) {
            setIsTargetInViewport(true);
          } else {
            setIsTargetInViewport(false);
          }
        }

        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

      return ( 
        <div className='inspect-container'>
            <div className={`inspect-info-container flex-box grey-background ${isScrolled ? 'add-dropshadow' : ''}`}>
                <div className={`inspect-furniture-container flex-box ${isTargetInViewport ? 'shrink-container' : ''}`}>
                    <div className='inspect-furniture'>
                        <h1 className={furniture.name && furniture.name.length > 13 ? 'small-font' : 'big-font'}>
                            {furniture.name}
                        </h1>
                        <p className={isTargetInViewport ? 'hide-price' : ''}>USD {furniture.price && furniture.price.toLocaleString()}</p>
                    </div>

                    <div className='add-to-cart flex-box'>
                        <i className='bx bx-plus'></i>
                        <p>Add to Cart</p>
                    </div>
                </div>

                <div className={`furniture-designer ${isTargetInViewport ? 'hide-designer' : ''}`}>
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

            <div className='related-furnitures-container'>
                <h1>Related Furnitures</h1>
                {relatedFurnitures && <RelatedFurnitures relatedFurnitures={relatedFurnitures}/>}
            </div>

            <div className='subpages-footer-container'>
                <Footer />
            </div>
        </div>
      )
    
      
}