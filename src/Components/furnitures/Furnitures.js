import { React, useState, useEffect } from "react";
import Search from "./Search";
import Footer from "../footer/Footer";

export default function Furnitures({furnitures, setFurnitures, searchResult, setSearchResult}) {
    const [selectedCat, setSelectedCat] = useState('All');
    const [isSearch, setIsSearch] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const filteredFurnitures = searchResult.filter(furniture => {
        return selectedCat === "All" ? furniture : furniture.category.category_name === selectedCat;
    });

    useEffect(() => {
        const handlePopstate = () => {
          window.location.reload();
        };
      
        window.addEventListener('popstate', handlePopstate);
      
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY >= 3);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    function handleCat(e) {
        setSelectedCat(e.target.value);
    }

    return (
        <div className="furnitures-container flex-box">
            <div className={`furnitures-operations-container flex-box grey-background ${isScrolled ? 'add-dropshadow' : ''}`}>
                <div className="cat-selections-container flex-box">
                    <label className="cat-selection">
                        <input type="radio" name='selection' value="All" defaultChecked={true} onChange={handleCat} />
                        <span>All</span>
                    </label>

                    <label className="cat-selection">
                        <input type="radio" name='selection' value="Chair" onChange={handleCat} />
                        <span>Chair</span>
                    </label>

                    <label className="cat-selection">
                        <input type="radio" name='selection' value="Table" onChange={handleCat} />
                        <span>Table</span>
                    </label>

                    <label className="cat-selection">
                        <input type="radio" name='selection' value="Sofa" onChange={handleCat} />
                        <span>Sofa</span>
                    </label>
                </div>

                <i className='bx bx-search' onClick={() => setIsSearch(true)}></i>
            </div>

            <div className='cards-container'>
                {filteredFurnitures.map(furniture => {
                    return (
                        <div className='card' key={furniture.id}>
                            <div className='card-img-container'>
                                <img src={furniture.image.thumbnail} alt='image' />
                            </div>
                            <div className='card-headline flex-box'>
                                <p>{furniture.designer}</p>
                                <p>{furniture.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='furnitures-footer-container'>
                <Footer />
            </div>

            {isSearch ? <Search setIsSearch={setIsSearch} furnitures={furnitures} setFurnitures={setFurnitures} setSearchResult={setSearchResult}/> : ''}
        </div>
    )
}