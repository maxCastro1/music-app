import { Error, Loader, SongCard } from "../components";
import {genres} from '../assets/constants';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetsongsgenreQuery } from "../redux/services/deezerApi";
import { useDispatch,useSelector } from "react-redux";


const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const {activeSong, isPlaying } = useSelector((state)=> state.player);
  const { data, isFetching, error } = useGetsongsgenreQuery(genreListId);
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  console.log(data?.data)
  if(isFetching) return <Loader title="Loading songs ..."/>
  if (data.error) return <Error />;
  return(
<div className="flex flex-col ">
    <div className="flex w-full justify-between items-center sm:flex-row flex-col mt-4 mb-10">
         <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
         onChange={(e) => dispatch(selectGenreListId(e.target.value))}
        value={genreListId || 'pop'}
        className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
            {genres.map((genres)=> <option key={genres.value} value={genres.value}>{genres.title}</option>)}
        </select>
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8"> 
         {data?.data?.map((song ,index) => (
         <SongCard
         key={song.id}
         song={song}
         i={index}
         isPlaying={isPlaying}
         activeSong={activeSong}
         data={data}
         />))}
    </div>
</div>
  )

};

export default Discover;
