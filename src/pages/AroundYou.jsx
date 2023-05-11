import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetrelatedsongsQuery } from "../redux/services/deezerApi";
import { Error, Loader, SongCard } from '../components';


const CountryTracks = () => {
const songname = 'SAINt JHN';
const {data, isFetching, error} = useGetrelatedsongsQuery(songname);
const { activeSong, isPlaying } = useSelector((state) => state.player);



if (isFetching) return <Loader title="Loading Songs around you..." />;

if (data.error) return <Error />;
console.log(data)
    return(
        <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around you <span className="font-black"></span></h2>
  
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data && data?.data?.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          ))}
        </div>
      </div>
    )
}

export default CountryTracks;
