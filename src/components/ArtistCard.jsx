import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetArtistQuery } from '../redux/services/deezerApi';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  const {data, isFetching, error} = useGetArtistQuery(track?.artist.id);
  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artist?.id}`)}
    >
      <img alt="song_img" src={data ? data?.picture_big : 'https://images.unsplash.com/photo-1510766315117-0f791eb90af7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' } className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.artist?.name}
      </p>
    </div>
  );
};

export default ArtistCard;
