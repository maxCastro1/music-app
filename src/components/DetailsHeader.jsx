import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeader = ({artistId, artistData, songData }) => {
  
   console.log(artistId)
  return (
    <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
  
    <div className="absolute inset-0 flex items-center">
      <img
        alt="profile"
        src={
          artistId ? artistId?.picture_big
            : songData?.album?.cover_big
  }
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />
  
      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artistId?.name : songData?.title}
        </p>
        {!artistId && (
          <Link to={`/artists/${songData?.artist?.id}`}>
            <p className="text-base text-gray-400 mt-2">{songData?.artist?.name}</p>
          </Link>
        )}
  
        <p className="text-base text-gray-400 mt-2">
         {artistId ?`Number of albums : ${artistId ?.nb_album}` : songData?.album?.title}
        </p>
          <p className="text-base text-gray-400 mt-2">
         {artistId && `Number of fans : ${artistId ?.nb_fan}`}
        </p>
      </div>
    </div>
    <div className="w-full sm:h-44 h-24" />
  </div>
  )

};

export default DetailsHeader;
