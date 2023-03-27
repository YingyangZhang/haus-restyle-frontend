import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-scroll';
import Search from "./Search";
import LoadingScreen from "../Loading/LoadingScreen";
import Footer from "../Footer/Footer";

export default function Furnitures({user, setUser, setIsForm, furnitures, isFurnituresLoading, setFurnitures, setSearchResult,cart, setCart}) {
    const [selectedCat, setSelectedCat] = useState('All');
    const [isSearch, setIsSearch] = useState(false);
    const filteredFurnitures = furnitures.filter(furniture => {
        return selectedCat === "All" ? furniture : furniture.category.category_name === selectedCat;
    });
    const token = localStorage.getItem("jwt");
    
    const navigate = useNavigate();

    useEffect(() => {
        const handlePopstate = () => {
          window.location.reload();
        };
      
        window.addEventListener('popstate', handlePopstate);
      
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    function handleCat(e) {
        setSelectedCat(e.target.value);
    }

    function handleAddToCart(e, furniture) {
        e.stopPropagation();

        if (user.length === 0) return setIsForm(true);
            
        const alreadyInCart = cart.find(item => item.furniture.name === furniture.name);
        if (alreadyInCart) {
            if (alreadyInCart.quantities <= 9) {
                fetch(`https://haus-db.onrender.com/cart_items/${alreadyInCart.id}`, {
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
            fetch('https://haus-db.onrender.com/cart_items/', {
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
        <div className='furnitures-container container' id='back-to-top'>
            {isFurnituresLoading && <LoadingScreen />}

            <div className='furnitures-menu-container' >
                <div className="furnitures-menu flex-box">
                    <div className="category-container flex-box">
                        <label className="category-selection">
                            <input type="radio" name='selection' value="All" defaultChecked={true} onChange={handleCat} />

                            <span>All</span>
                        </label>

                        <label className="category-selection">
                            <input type="radio" name='selection' value="Chair" onChange={handleCat} />

                            <span>Chair</span>
                        </label>

                        <label className="category-selection">
                            <input type="radio" name='selection' value="Table" onChange={handleCat} />

                            <span>Table</span>
                        </label>

                        <label className="category-selection">
                            <input type="radio" name='selection' value="Sofa" onChange={handleCat} />

                            <span>Sofa</span>
                        </label>
                    </div>

                    <div className="search-button">
                        <i className='bx bx-search' onClick={() => setIsSearch(true)}></i>
                    </div>
                </div>
            </div>

            <div className='cards-container'>
                {filteredFurnitures.map(furniture => {
                    return (
                        <div className='card' onClick={() => navigate(`/furnitures/${furniture.id}`)} key={furniture.id}>
                            <div className='card-img-container'>
                                <img src={furniture.image.thumbnail} alt='image' className='fixed-img' />
                            </div>
                            
                            <div className='card-info-container flex-box'>
                                <p>{furniture.designer}</p>

                                <p>{furniture.name}</p>
                            </div>

                            <div className="quick-add-to-cart-button" onClick={(e) => handleAddToCart(e, furniture)}>
                                <p>Add to Cart</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Link to="back-to-top"
                smooth={true}
                duration={500}
                offset={-100} 
                className='back-to-top-button'>
                <i className='bx bx-chevron-up'></i>
            </Link>

            <div className='subpages-footer-container'>
                <Footer />
            </div>

            {isSearch ? 
            <Search setIsSearch={setIsSearch} 
                    furnitures={furnitures} 
                    setFurnitures={setFurnitures} 
                    setSearchResult={setSearchResult}/> 
            : ''}
        </div>
    )
}