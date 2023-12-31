import React, { useEffect, useState } from "react";
import Navigasi from "./components/Navigasi";
import Footer from "./components/Footer";

export default function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=b01f0a490c4126adb1d5a66a5ad05f1d"
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b01f0a490c4126adb1d5a66a5ad05f1d&query=${query}`
      )
        .then((res) => res.json())
        .then((json) => setSearchResults(json.results));
    } else {
      // Kosongkan hasil pencarian jika query kosong
      setSearchResults([]);
    }
  };

  // Gabungkan hasil pencarian dengan daftar film jika ada hasil pencarian
  const combinedMovieList = searchQuery !== "" ? searchResults : movieList;

  return (
    <div className="flex flex-wrap justify-center">
      <Navigasi onSearch={handleSearch} />
      {combinedMovieList.map((movie) => (
        <div key={movie.id} className="max-w-sm m-2 mt-10 w-64 ml-5">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-200">
            <img
              className="w-full h-96"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="p-2">
              <h2 className="text-xl font-semibold text-black">{movie.title}</h2>
              <p className="text-black">Release Date: {movie.release_date}</p>
              <p className="text-black">Vote Average: {movie.vote_average}</p>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}
