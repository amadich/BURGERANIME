import { useEffect } from 'react';
import '../assets/css/Snowflakes.css'; // Create and import the CSS for the snowflakes

const Snowflakes = () => {
  useEffect(() => {
    // Snowflake generation function
    const createSnowflakes = () => {
      const snowContainer = document.querySelector('.snow');
      for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.width = `${Math.random() * 3 + 2}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.animationDuration = `${Math.random() * 3 + 4}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        if (snowContainer) {
          snowContainer.appendChild(snowflake);
        }
      }
    };

    createSnowflakes(); // Initialize snowflakes on mount

    return () => {
      // Cleanup the snowflakes when the component unmounts
      const snowContainer = document.querySelector('.snow');
      if (snowContainer) {
        snowContainer.innerHTML = ''; // Remove snowflakes when component is removed
      }
    };
  }, []);

  return <div className="snow"></div>;
};

export default Snowflakes;
