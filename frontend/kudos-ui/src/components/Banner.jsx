import { useEffect, useState } from 'react';

import "../styles/Banner.css"

const Banner = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.username) {
      setUsername(storedUser.username);
    }
  }, []);

  return (
    <section className="banner">
      <h1>Welcome to Kudos{username ? `, ${username}` : ''}!</h1>
      <p>Organize your boards, collaborate with your team, and have fun!</p>
    </section>
  );
};

export default Banner;

