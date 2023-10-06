import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import "../App.css";
import axios from "axios";
import Hero from "../components/hero";
import Search from "../components/search";
import PopularMoviesList from "../components/PopularMoviesList";
const key = "396e1f3a801a3992cc2ce865047a5109";

function Main() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function filterAdult(movies) {
    setMovies(movies.filter((movie) => movie.adult !== true));
  }
  function updateQuery(movies) {
    filterAdult(movies);
  }
  function handlePage(current) {
    setCurrentPage(current);
  }
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${currentPage}`
      )
      .then((response) => {
        console.log(response.data.results);
        filterAdult(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]);
  return (
    <>
      <Hero>
        <Search
          newMovies={updateQuery}
          insted={(newPage) => setCurrentPage(newPage)}
        />
      </Hero>
      <PopularMoviesList movies={movies} />

      <Paginat
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </>
  );
}

function Paginat({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
    </div>
  );
}

export default Main;
