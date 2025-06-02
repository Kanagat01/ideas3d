import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { generatePath, Link } from "react-router-dom";
import Routes from "~/shared/routes";

type CarouselItem = { id: number; title: string; img: string };

export function Carousel({
  items,
}: {
  items: (CarouselItem | { img: string })[];
}) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      loop={items.length > 4}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
    >
      {items.map((item, key) => (
        <SwiperSlide key={key}>
          {"id" in item ? (
            <CarouselCard {...item} />
          ) : (
            <img src={item.img} alt={`carousel-img-${key}`} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function CarouselCard(props: CarouselItem) {
  return (
    <Link
      to={generatePath(Routes.NEWS, { id: props.id.toString() })}
      className="carousel__card"
    >
      <img src={props.img} alt={props.title} />
      <h4>{props.title}</h4>
    </Link>
  );
}
