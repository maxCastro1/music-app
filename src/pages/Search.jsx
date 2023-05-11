import React , {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetrelatedsongsQuery } from '../redux/services/deezerApi';

const Search = () => {
  const  songName  = useParams().searchTerm;
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetrelatedsongsQuery(songName);
  console.log(data)
  const [e , setE] = useState(false);


  if (isFetching) return <Loader title={`Searching ${songName}...`} />;

  if (data.error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black">{songName}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
