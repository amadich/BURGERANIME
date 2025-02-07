import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '../assets/css/StarButton.css'; // Import the CSS file for the animation
import axios from 'axios'; // Import axios for making HTTP requests

const StarButton = ({ idanime, iduser, favoriteAnime } : any) => {
  const SERVER = import.meta.env.VITE_HOSTSERVER;
  const token = localStorage.getItem('token');
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    
    
    if( favoriteAnime != null ) {
      if (favoriteAnime.includes(idanime)) {
        setIsFavorited(true);
      }
    }
    
  }, [idanime, favoriteAnime]);

  const toggleFavorite = async () => {
    if (token == null) {
      alert('You must be logged in to favorite an anime.');
      window.location.href = '/signin';
      return;
    }
    try {
      if (!isFavorited) {
        await axios.post(`${SERVER}/api/profile/favAnimelist/${idanime}/${iduser}`);
      } else {
        await axios.post(`${SERVER}/api/profile/removefavAnimelist/${idanime}/${iduser}`);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`rounded-full transition-transform duration-300 ease-in-out 
        ${isFavorited ? 'bg-transparent text-white' : 'bg-transparent text-gray-600'}
        ${isFavorited ? 'star-animate' : ''}
      `}
    >
      <i 
          title='Favorite List'
          className={`fas fa-heart ${isFavorited ? 'text-orange-500' : 'text-gray-300'}`}></i>

    </button>
  );
};

export default StarButton;
