import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocationSuggestion } from '../../../utils/interface/interface';

const MAPBOX_API_KEY = import.meta.env.VITE_MAP_BOX_ACCESS_KEY as string;

interface IJobListSearchComponent {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    handleSearch: any
}


const JobListSearchComponent: React.FC<IJobListSearchComponent> = ({
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    handleSearch,
}) => {
    const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
    const [locationSelected,setLocationSelected] = useState(false)

    const fetchLocationSuggestions = async (searchText: string) => {
        try {
            console.log('search in fetch location ', searchText);

            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${MAPBOX_API_KEY}&country=IN`
            );
            setLocationSuggestions(response.data.features);
            if (!response.data.features.length && searchText) {
                setLocationSuggestions([{ id: '1111', place_name: 'No result found' }]);

            }
        } catch (error) {
            console.error('Failed to fetch location suggestions:', error);
        }
    };

    useEffect(() => {
        if(locationSelected)return
        if (!location) {

            fetchLocationSuggestions(location);
        }
        if (location) {
            fetchLocationSuggestions(location);
        }
    }, [location, locationSelected]);

    return (
        <div className="flex flex-row justify-center items-center mb-4 text-center w-full relative">
            <input
                type="text"
                placeholder="Search for jobs"
                className="ml-2 px-7 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 w-[450px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
                <input
                    type="text"
                    placeholder="Location"
                    className="ml-2 px-7 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 w-[300px]"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                        if (e.target.value.length > 2) {
                            fetchLocationSuggestions(e.target.value);
                        }
                    }}
                />
                <div className="ml-2 relative">
                    <div className="absolute z-10 mt-2 w-[350px] px-6 bg-white shadow-md rounded-md overflow-hidden border-r-black border-r-6">
                        {locationSuggestions.slice(0, 6).map((suggestion) => (
                            <div
                                key={suggestion.id}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                                onClick={() => {
                                    setLocation(suggestion.place_name);
                                    setLocationSelected(true)
                                    setLocationSuggestions([])
                                }}
                            >
                                {suggestion.place_name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className="ml-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default JobListSearchComponent;
