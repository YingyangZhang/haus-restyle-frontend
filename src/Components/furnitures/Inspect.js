import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedFurnitures from "./RelatedFurnitures";
import LoadingScreen from "../loading/LoadingScreen";
import Footer from "../footer/Footer";

export default function Inspect({isScrolled, user, setUser, cart, setCart}) {
    const [furniture, setFurniture] = useState({});
    const [relatedFurnitures, setRelatedFurnitures] = useState([]);
    const { id } = useParams();
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(true);
    let count = 0;
    const token = localStorage.getItem("jwt");

    function onLoad() {
        count++;

        if (count === 3) {
            setImagesLoading(false);
        }
    }

    useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        const scrollThreshold = 83;
        
        if (scrollPosition > scrollThreshold && !isScrollingDown) {
            setIsScrollingDown(true);
        } else if (scrollPosition < scrollThreshold && isScrollingDown) {
            setIsScrollingDown(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, [isScrollingDown]);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/furnitures/${id}`)
        .then(r => r.json())
        .then(data => {
            setFurniture(data);
        })
    },[id]);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/furnitures')
          .then(r => r.json())
          .then(data => {
            const filteredFurnitures = data.filter(relatedFurniture => {
              return relatedFurniture.category.category_name === furniture.category?.category_name;
            });
            const randomFurnitures = filteredFurnitures.sort(() => Math.random() - 0.5).slice(0, 3);
            setRelatedFurnitures(randomFurnitures);
          });
    }, [furniture.category]);

    function handleAddToCart() {
        const alreadyInCart = cart.find(item => item.furniture.name === furniture.name);
        if (alreadyInCart) {
            if (alreadyInCart.quantities <= 9) {
                fetch(`http://127.0.0.1:3000/cart_items/${alreadyInCart.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        'quantities': alreadyInCart.quantities + 1,
                    })
                }).then(r => r.json())
                .then(data => {
                    setCart(data.user.cart_items)
                })
            }
        } else {
            fetch('http://127.0.0.1:3000/cart_items/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    'quantities': 1,
                    'user_id': user.id,
                    'furniture_id': furniture.id,
                })
            }).then(r => r.json())
            .then(data => {
                setUser(data.user)
                setCart(data.user.cart_items)
            })
        }
    }

    return ( 
    <div className='inspect-container'>
        {imagesLoading && <LoadingScreen />}

        <div className={`inspect-info-container flex-box grey-background ${isScrolled ? 'add-dropshadow' : ''}`}>
            <div className={`inspect-furniture-container flex-box ${isScrollingDown ? 'shrink-container' : ''}`}>
                <div className='inspect-furniture'>
                    <h1 className={furniture.name && furniture.name.length > 13 ? 'small-font' : 'big-font'}>
                        {furniture.name}
                    </h1>
                    <p className={isScrollingDown ? 'hide-price' : ''}>USD {furniture.price && furniture.price.toLocaleString()}</p>
                </div>

                <div className='add-to-cart flex-box' onClick={handleAddToCart} >
                    <i className='bx bx-plus'></i>
                    <p>Add to Cart</p>
                </div>
            </div>

            <div className={`furniture-designer ${isScrollingDown ? 'hide-designer' : ''}`}>
                <p>{furniture.designer}</p>
            </div>
        </div>

        <div className='inspect-imgs-container flex-box'>
            <div className='inspect-img-container'>
                <img src={furniture.image && furniture.image.angle1} onLoad={onLoad} alt='image' />
            </div>

            <div className='inspect-img-container'>
                <img src={furniture.image && furniture.image.angle2} onLoad={onLoad} alt='image' />
            </div>

            <div className='inspect-img-container'>
                <img src={furniture.image && furniture.image.angle3} onLoad={onLoad} alt='image' />
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
            {relatedFurnitures && <RelatedFurnitures relatedFurnitures={relatedFurnitures} setImagesLoading={setImagesLoading} />}
        </div>

        <div className='subpages-footer-container'>
            <Footer />
        </div>

        
    </div>
    )
    
      
}