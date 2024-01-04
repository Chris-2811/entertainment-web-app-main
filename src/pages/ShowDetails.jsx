import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import YoutubePlayer from '../components/YoutubePlayer';
import play from '../assets/play.svg';

function ShowDetails() {
  const [show, setShow] = useState();
  const [loading, setLoading] = useState(true);
  const [truncated, setTruncated] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const key = '05e1c39526cfcad16d30aae45602a17f';
    const fetchShow = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${key}`
      );
      const data = await response.json();

      const response2 = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${key}`
      );
      const data2 = await response2.json();
      const trailer = data2.results;

      setTrailer[trailer];

      const result = trailer.find((item) => {
        return item.type === 'Trailer';
      });

      if (result !== undefined) {
        const link = result.key;
        setLink(link);
      }

      setShow(data);
      setLoading(false);
      console.log(data);
    };

    fetchShow();
  }, [id]);

  function truncateString(str, num) {
    if (str.length > num && truncated === true) {
      let truncatedString = str.slice(0, num);
      truncatedString = truncatedString.slice(
        0,
        truncatedString.lastIndexOf(' ')
      );
      return truncatedString;
    } else {
      return str;
    }
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="text-white h-[100vh]">
      <img
        src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
        alt={show.title}
        className=" opacity-20 -z-10 absolute w-[100vw] h-[100vh] object-cover bg-center top-0 left-0"
      />
      <div className="mycontainer">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-transparent border py-2 rounded-md  px-6 mt-10 border-sunset-orange hover:bg-sunset-orange"
        >
          Go Back
        </button>
        <div className="mt-12">
          <div className="md:flex md:gap-6 lg:gap-12 relative max-w-[1068px]">
            <div
              className={`${
                showPlayer ? 'static' : 'relative'
              } rounded-lg max-w-[350px] max-h-[550px] lg:max-h-[600px] lg:h-[600px] lg:w-[400px] lg:max-w-[400px] xs:h-[550px] xs:w-[350px]`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                alt=""
                className="w-full rounded-lg max-w-[400px]"
              />
              <div
                className={`absolute group ${
                  !showPlayer
                    ? `hover:bg-black/50 ${link ? 'cursor-pointer' : ''}`
                    : 'cursor-normal'
                } 
                grid rounded-lg place-items-center inset-0  transition-all duration-200 `}
              >
                {trailer && (
                  <YoutubePlayer
                    className="absolute"
                    link={`https://www.youtube.com/watch?v=${link}`}
                    setShowPlayer={setShowPlayer}
                    showPlayer={showPlayer}
                  ></YoutubePlayer>
                )}
                {link && (
                  <div
                    onClick={() => setShowPlayer(true)}
                    className="hidden group-hover:flex items-center gap-5 bg-white/25 p-[0.5625rem] pr-6 max-w-max rounded-[28.5px]"
                  >
                    <img src={play} alt="play-icon" />
                    <p>Play</p>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`pb-8 border-b md:border-0 ${
                showPlayer ? 'md:hidden' : ''
              }`}
            >
              <h1
                className={`heading-lg ${
                  showPlayer ? 'mt-[4rem] xxxxs:mt-[2.5rem]' : ''
                } mt-6 sm:mt-6 md:mt-0`}
              >
                {show.name}
              </h1>
              <div className="flex items-center gap-1 py-6">
                <FaStar color="#FFA500" size="1.1em" />
                <p>{show.vote_average.toFixed(1)} / 10</p>
              </div>
              <p className="mb-4">
                <span className="font-semibold ">Release Date:</span>{' '}
                {show.first_air_date}
              </p>
              <p className="mb-4 max-w-[440px] md:text-lg lg:text-xl">
                {truncateString(show.overview, 250)}
                {truncated && show.overview.length > 250 ? (
                  <span
                    className="cursor-pointer text-3xl leading-3 text-sunset-orange"
                    onClick={() => setTruncated(false)}
                  >
                    ...
                  </span>
                ) : (
                  !truncated && (
                    <div
                      className="text-md text-sunset-orange cursor-pointer"
                      onClick={() => setTruncated(true)}
                    >
                      Show less
                    </div>
                  )
                )}
              </p>
              <div>
                <h3 className="font-semibold md:text-lg">Genres:</h3>
                {show.genres.map((genre) => {
                  return <p>{genre.name}</p>;
                })}
              </div>
              <a
                href={show.homepage}
                target="_blank"
                rel="noreferrer noopener"
                className="text-white block max-w-max bg-transparent border py-2 rounded-md  px-6 mt-7 border-sunset-orange hover:bg-sunset-orange"
              >
                Visit Show Homepage
              </a>
            </div>
          </div>
          <div className="pt-8">
            <h2 className="heading-lg uppercase text-center lg:text-left lg:mb-4">
              TV series info
            </h2>
            <ul role="list">
              <li className="flex items-baseline gap-2 border-b-2 border-white/10 lg:w-[85%]  py-4 md:text-lg lg:max-w-[940px]">
                <p className="text-sunset-orange font-semibold ">
                  Number of Seasons:
                </p>
                <small>{show.number_of_seasons}</small>
              </li>
              <li className="flex items-baseline gap-2 border-b-2 border-white/10 lg:w-[85%]   py-4 md:text-lg lg:max-w-[940px]">
                <p className="text-sunset-orange font-semibold ">
                  Nubmer of Episodes:
                </p>
                <small>{show.number_of_episodes}</small>
              </li>

              <li className="flex items-baseline gap-2 border-b-2 border-white/10 lg:w-[85%]   py-4 md:text-lg lg:max-w-[940px]">
                <p className="text-sunset-orange font-semibold ">Status:</p>
                <small>{show.status}</small>
              </li>
            </ul>
            <div className="items-center gap-4 mt-6 hidden md:flex">
              <h3 className="">Production Companies:</h3>
              <p>
                {show.production_companies
                  .map((company) => {
                    return company.name;
                  })
                  .join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
