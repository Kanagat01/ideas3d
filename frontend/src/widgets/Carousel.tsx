import { useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { generatePath, Link } from "react-router-dom";
import Routes from "~/shared/routes";

type CarouselItem =
  | { id: number; title: string; img: string }
  | { img: string };

export function Carousel({ items }: { items: CarouselItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [move, setMove] = useState<"left" | "right">();
  const calcPrevFor = (num: number) => (num === 0 ? items.length - 1 : num - 1);
  const calcNextFor = (num: number) => (num === items.length - 1 ? 0 : num + 1);
  const prevIdx = calcPrevFor(activeIdx);
  const nextIdx = calcNextFor(activeIdx);
  const carouselMode = items.length > 3;

  return (
    <div
      className={`carousel${
        !(items.length !== 0 && "title" in items[0]) ? "carousel--only-img" : ""
      }`}
      style={!carouselMode ? { justifyContent: "center" } : {}}
    >
      {carouselMode && (
        <button
          className="prev-btn"
          onClick={() => {
            if (!move) {
              setMove("right");
              setTimeout(() => {
                setActiveIdx(prevIdx);
                setMove(undefined);
              }, 300);
            }
          }}
        >
          <SlArrowLeft />
        </button>
      )}
      <div ref={carouselRef} className="carousel__items">
        {carouselMode ? (
          <>
            <CarouselCard {...items[calcPrevFor(prevIdx)]} move={move} />
            <CarouselCard {...items[prevIdx]} move={move} />
            <CarouselCard {...items[activeIdx]} move={move} />
            <CarouselCard {...items[nextIdx]} move={move} />
            <CarouselCard {...items[calcNextFor(nextIdx)]} move={move} />
          </>
        ) : (
          items.map((item, key) => (
            <CarouselCard key={key} {...item} move={move} />
          ))
        )}
      </div>
      {carouselMode && (
        <button
          className="next-btn"
          onClick={() => {
            if (!move) {
              setMove("left");
              setTimeout(() => {
                setActiveIdx(nextIdx);
                setMove(undefined);
              }, 300);
            }
          }}
        >
          <SlArrowRight />
        </button>
      )}
    </div>
  );
}

function CarouselCard({
  move,
  ...props
}: CarouselItem & { move?: "right" | "left" }) {
  return "title" in props ? (
    <Link
      to={generatePath(Routes.NEWS, { id: props.id.toString() })}
      className={`carousel__card move-${move}`}
    >
      <img src={props.img} alt={props.title} />
      <h4>{props.title}</h4>
    </Link>
  ) : (
    <div className={`carousel__card move-${move}`}>
      <img src={props.img} alt="" />
    </div>
  );
}
