import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "We've Arrived in Jakarta!",
      description: 'Discover amazing promotions in Jakarta.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Jakarta_Skyline_Part_2.jpg/1200px-Jakarta_Skyline_Part_2.jpg',
    },
    {
      id: 2,
      title: 'Explore Promotions in Manado!',
      description: 'Limited-time offers waiting for you.',
      imageUrl:
        'https://cdn.idntimes.com/content-images/community/2018/01/14591119-299464587123415-8759803387530182656-n-25fac925763e0e07e014a77962802019.jpeg',
    },
    {
      id: 3,
      title: 'Exclusive Deals in Semarang!',
      description: "Don't miss out on our special promotions.",
      imageUrl:
        'https://asset-2.tstatic.net/tribunmanadowiki/foto/bank/images/kota-manado.jpg',
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
            <img
              src={promotion.imageUrl}
              alt={promotion.title}
              className=" w-full h-full object-fill rounded"
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
