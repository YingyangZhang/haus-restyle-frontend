import { React, useState } from "react";

export default function Furnitures() {
    const [selectedCat, setSelectedCat] = useState('all');

    function handleCat(e) {
        setSelectedCat(e.target.value);
    }

    return (
        <div className="furnitures-container grey-background">
            <div className="furnitures-operations-container">
                <div className="cat-selections-container flex-box">
                    <label className="cat-selection">
                        <input type="radio" name='selection' value="all" defaultChecked={true} onChange={handleCat} />
                        <span>All</span>
                    </label>

                    <label className="cat-selection">
                        <input type="radio" name='selection' value="chair" onChange={handleCat} />
                        <span>Chair</span>
                    </label>

                    <label className="cat-selection">
                        <input type="radio" name='selection' value="table" onChange={handleCat} />
                        <span>Table</span>
                    </label>

                    <label className="cat-selection">
                        <input type="radio" name='selection' value="sofa" onChange={handleCat} />
                        <span>Sofa</span>
                    </label>
                </div>
            </div>
        </div>
    )
}