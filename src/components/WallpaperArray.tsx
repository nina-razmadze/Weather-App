import "tailwindcss/tailwind.css";

import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.png";
import img6 from "../images/img6.jpg";
import img8 from "../images/img8.jpg";
import img9 from "../images/img9.jpg";
import img10 from "../images/img10.png";
import img12 from "../images/img12.png";

export const wallpaperArray = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img8,
  img9,
  img10,
  img12,
];

export const randomIndex = Math.floor(Math.random() * wallpaperArray.length);
