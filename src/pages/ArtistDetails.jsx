import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetArtistQuery,useGetrelatedsongsQuery } from '../redux/services/deezerApi';

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching } = useGetArtistQuery(artistId);
   const [songName, setSongName ] = useState('')
  const { data:artistSongs ,isFetching: isFetchinRelatedSongs, error} = useGetrelatedsongsQuery(songName);

console.log(useGetArtistQuery(artistId))

useEffect(()=>{
    setSongName(data?.name);

},[data])
console.log(artistSongs)
const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  if (isFetching) return <Loader title="Searching Artist details" />;
  if (data.error) return <Error />;

    return (
    <div className='flex flex-col'>
        <DetailsHeader artistId={data}/>
        {/* <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
        </div>
      </div> */}

      <RelatedSongs
        data={artistSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>

    )
}

export default ArtistDetails;

