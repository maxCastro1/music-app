import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongQuery ,useGetrelatedsongsQuery } from '../redux/services/deezerApi';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [errors, setError] = useState(false)
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongQuery(songid);
  const [songName, setSongName ] = useState('')

  const { data ,isFetching: isFetchinRelatedSongs, error} = useGetrelatedsongsQuery(songName);
  

useEffect(()=>{
    if(songData?.errors) {
        setError(true)
    }
    setSongName(songData?.title);

},[songData])
 
const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  if (isFetchingSongDetails && isFetchinRelatedSongs) return <Loader title="Searching song details" />;
  if (data.error) return <Error />;

    return (
    <div className='flex flex-col'>
        <DetailsHeader artistId='' songData={songData}/>
        <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
        </div>
      </div>

      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>

    )
}

export default SongDetails;
