import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addItem, deleteItem } from "../redux/thelist";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, isFavorite }) {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const toggleFavorite = () => {
    if (isFavorite) {
      // If the movie is already a favorite, remove it from the list
      dispatch(deleteItem(movie.id));
    } else {
      // If the movie is not a favorite, add it to the list
      dispatch(addItem(movie.id));
    }
  };

  return (
    <div className="card m-1 col-sm-3 col-md-3 col-lg-2">
      <img
        className="card-img-top"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="Card image cap"
      />
      <div className="card-body">
      {/* to={`moviedetails/${movie.id}`} */}
        <h2 style={{cursor:'pointer'}} onClick={()=>{navigate(`/moviedetails/${movie.id}`)}} className="card-title">{movie.title}</h2>
        <small>
          {movie.release_date}
          <span
            onClick={toggleFavorite}
            className="d-inline d-flex justify-content-end"
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>
        </small>
      </div>
    </div>
  );
}
