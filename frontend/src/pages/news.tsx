import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { Navigate, useParams } from "react-router-dom";
import { BackBtnContainer } from "~/widgets";
import { $news, getNewsFx } from "~/entities/News";
import { Preloader } from "~/shared/ui";
import Routes from "~/shared/routes";


export default function NewsPage() {
  const { id } = useParams();
  const [triedLoad, setTriedLoad] = useState(false);
  const [isLoading, news] = useUnit([getNewsFx.pending, $news]);
  const newsObj = news.find((el) => el.id === Number(id));

  useEffect(() => {
    if (news.length === 0 || !newsObj)
      getNewsFx().then(() => setTriedLoad(true));
  }, []);

  if (isLoading) return <Preloader />;
  if (triedLoad && !newsObj) return <Navigate to={Routes.HOME} replace />;

  return (
    newsObj && (
      <div
        style={{
          width: "100%",          // контейнер на всю ширину
          padding: "40px 60px",   // увеличенный отступ сверху/снизу и слева/справа
          boxSizing: "border-box",
        }}
      >
        <BackBtnContainer />
        <h1>{newsObj.title}</h1>
        <img
          src={newsObj.img}
          alt={`${newsObj.title}-img`}
          style={{
            float: "right",        // изображение справа
            width: "300px",        // увеличили в 2 раза (если раньше было 300px)
            margin: "0 0 20px 30px", // увеличили отступ слева, чтобы текст не прилипал
            borderRadius: "5px",
          }}
        />
        <div
          style={{ whiteSpace: "pre-wrap", lineHeight: 1.4 }}
          dangerouslySetInnerHTML={{
            __html: newsObj.description
              // Заменяем все подряд идущие <br> (2 и более) на один <br>
              .replace(/(<br>\s*){2,}/g, "<br>")
          }}
        />
        <div style={{ clear: "both" }} /> {/* очищаем float */}
      </div>
    )
  );
}
