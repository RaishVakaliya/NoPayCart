import React, { useEffect, useState } from "react";
import "./sideArrow.css";
import image1 from "../assest/banner/img1.jpg";
import image2 from "../assest/banner/img2.png";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.png";
import image5 from "../assest/banner/img5.webp";
import image6 from "../assest/banner/img6.webp";
import image7 from "../assest/banner/img7.png";
import image8 from "../assest/banner/img8.webp";
import image9 from "../assest/banner/img9.jpg";
import image10 from "../assest/banner/img10.png";

import image1Mobile from "../assest/banner/img1_mobile.png";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import image6Mobile from "../assest/banner/img6_mobile.jpg";
import image7Mobile from "../assest/banner/img7_mobile.jpeg";
import image8Mobile from "../assest/banner/img8_mobile.png";
import image9Mobile from "../assest/banner/img9_mobile.jpg";
import image10Mobile from "../assest/banner/img10_mobile.png";

const BannerProduct = () => {
  const [currentImage, setcurrentImage] = useState(0);
  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
    image6Mobile,
    image7Mobile,
    image8Mobile,
    image9Mobile,
    image10Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setcurrentImage((preve) => preve + 1);
    }
  };

  const prevImage = () => {
    if (currentImage !== 0) {
      setcurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentImage((prev) =>
        prev < desktopImages.length - 1 ? prev + 1 : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-4xl">
            <button onClick={prevImage} className="button-3d">
              <div>
                <div className="button-top">
                  <span className="material-icons">❮</span>
                </div>
              </div>
            </button>
            <button onClick={nextImage} className="button-3d">
              <div>
                <div className="button-top">
                  <span className="material-icons">❯</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* desktop and tablet version */}
        <div className="hidden md:flex w-full h-full overflow-hidden">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                className="h-full w-full min-h-full min-w-full transition-all"
                key={imageUrl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} alt="" className="h-full w-full" />
              </div>
            );
          })}
        </div>

        {/* mobile version */}

        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobileImages.map((imageUrl, index) => {
            return (
              <div
                className="h-full w-full min-h-full min-w-full transition-all"
                key={imageUrl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
