import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import img1 from '../../../public/jakarta.jpg';
import img2 from '../../../public/manado.jpeg';
import img3 from '../../../public/semarang.jpg';

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "We've Arrived in Jakarta!",
      description: 'Discover amazing promotions in Jakarta.',
      imageUrl: img1,
    },
    {
      id: 2,
      title: 'Explore Promotions in Manado!',
      description: 'Limited-time offers waiting for you.',
      imageUrl: img2,
    },
    {
      id: 3,
      title: 'Exclusive Deals in Semarang!',
      description: "Don't miss out on our special promotions.",
      imageUrl: img3,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {promotions.map((promotion) => (
        <div key={promotion.id}>
          <div className="relative h-[200px] flex pt-5 p-2">
            <Image
              src={promotion.imageUrl}
              alt={promotion.title}
              className=" w-full h-full object-fill rounded"
              width={21000}
              height={800}
            />
            <div className="absolute flex flex-col justify-center items-center text-white text-center left-0 right-0 top-0 bottom-0 p-5">
              <h2 className="text-2xl font-bold mb-2 text-color-primary">
                {promotion.title}
              </h2>
              <p className="text-sm text-color-primary">
                {promotion.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Promotions;
