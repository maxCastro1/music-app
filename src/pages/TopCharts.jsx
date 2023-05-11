import { Error, Loader, SongCard } from "../components";
import {genres} from '../assets/constants';
import { useGetTopChartsQuery, useGetTopArtistsQuery } from "../redux/services/deezerApi";
import { useDispatch,useSelector } from "react-redux";


const TopCharts = () =>{

        const dispatch = useDispatch();
        const {activeSong, isPlaying } = useSelector((state)=> state.player);
        const {data, isFetching, error} = useGetTopChartsQuery(3155776842);
      
      
        if(isFetching) return <Loader title="Loading songs ..."/>
        if (data.error) return <Error />;
        return(
      <div className="flex flex-col ">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8"> 
               {data?.tracks?.data.map((song ,index) => (
               <SongCard
               key={song.id}
               song={song}
               i={index}
               isPlaying={isPlaying}
               activeSong={activeSong}
               data={data.tracks.data}
               />))}
          </div>
      </div>
        )
      
      };
    


export default TopCharts;
