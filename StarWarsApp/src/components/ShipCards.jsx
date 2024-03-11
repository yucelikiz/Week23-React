import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStarships, searchStarships } from './API';

const ShipCards = () => {
    const [starships, setStarships] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchStarships = async () => {
            try {
                const data = await getStarships();
                setStarships(data.results);
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchStarships();
    }, []);

    const handleSearchChange = async () => {
        try {
            const data = await searchStarships(searchQuery);
            setStarships(data.results);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <h2>Star Wars Spaceships</h2>
            <input
                type="text"
                placeholder="Search starships..."
                value={searchQuery}
                onChange={handleChange}
            />
            <button onClick={handleSearchChange}>Search</button>
            <div className='spaceship-list'>
                {starships.map((starship, index) => (
                    <div key={index} className="spaceship-card">
                        <Link to={`/spaceship/${encodeURIComponent(starship.name)}`} className="card-link">
                            <img src={getImageUrl()} alt={starship.name} />
                            <div className="info">
                                <h3>{starship.name}</h3>
                                <p>Model: {starship.model}</p>
                                <p>Hyperdrive Rating: {starship.hyperdrive_rating}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShipCards;
