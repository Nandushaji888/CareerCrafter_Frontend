import React from 'react'

interface IJobListSearchComponent{
    searchQuery:string,
    setSearchQuery:any;
    location:string,
    setLocation:any;
    handleSearch:any;
}

const JobListSearchComponent: React.FC<IJobListSearchComponent> = ({searchQuery,setSearchQuery,location,setLocation,handleSearch}) => {
    return (
        <div className="flex  flex-row  justify-center items-center mb-4 text-center w-full ">
            {/* <div className="relative border-gray-300 bg-white rounded-full focus:outline-none focus:border-blue-500 px-3 border"> */}
            <input
                type="text"
                placeholder="Search for jobs"
                className="ml-2 px-7 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 w-[350px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
            {/* </div> */}
            <input
                type="text"
                placeholder="Location"
                className="ml-2 px-7 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 w-[200px]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button
                className="ml-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-700  focus:outline-none  "
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    )
}

export default JobListSearchComponent
