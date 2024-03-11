import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStarshipDetails } from './API';
import { getStarships } from './API';
import '../App.css';

function Details() {
    const { id } = useParams();
    const [starship, setStarship] = useState(null);

    useEffect(() => {
        const fetchStarshipDetails = async () => {
            try {
                const ships = await getStarships();
                const main = ships.results;
                const element = main[id - 1];

                const detailData = await getStarshipDetails(element.url);
                setStarship(detailData);
            } catch (error) {
                console.error('Error fetching starship details:', error);
            }
        };

        fetchStarshipDetails();
    }, [id]);

    if (!starship) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{starship.name}</h2>
            <p>Model: {starship.model}</p>
            <p>Passengers: {starship.passengers}</p>
            <p>Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
            <p>Manufacturer: {starship.manufacturer}</p>
            <p>Crew: {starship.crew}</p>
            <p>Cargo Capacity: {starship.cargo_capacity}</p>
            <Link to="/">Back to Starships List</Link>
        </div>
    );
}

export default Details;