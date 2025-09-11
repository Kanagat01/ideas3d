import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { generatePath, Link } from "react-router-dom";
import Routes from "~/shared/routes";

type CarouselItem = { id: number; title: string; img: string };

export function Carousel({ items }: { items: (CarouselItem | { img: string })[] }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      loop={items.length > 4}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination
      modules={[EffectCoverflow, Pagination]}
      className="swiper"
    >
      {items.map((item, key) => (
        <SwiperSlide key={key} className="swiper-slide flex justify-center">
          <div className="carousel__card-wrapper">
            {"id" in item ? (
              <Link
                to={generatePath(Routes.NEWS, { id: item.id.toString() })}
                className="carousel__card"
              >
                <div className="carousel__image-wrapper">
                  <img src={item.img} alt={item.title} className="carousel__image" />
                </div>
                <h4>{item.title}</h4>
              </Link>
            ) : (
              <div className="carousel__card">
                <div className="carousel__image-wrapper">
                  <img src={item.img} alt="" className="carousel__image" />
                </div>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
