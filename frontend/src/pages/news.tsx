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
      <div className="news-container">
        <BackBtnContainer />
        <h1>{newsObj.title}</h1>
        <img src={newsObj.img} alt={`${newsObj.title}-img`} />
        <p>{newsObj.description}</p>
      </div>
    )
  );
}
