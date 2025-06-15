import { Modal } from "antd";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useUnit } from "effector-react";
import { FormEvent, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BackBtnContainer } from "~/widgets";
import {
  $cart,
  $catalog,
  createApplicationFx,
  getCatalogFx,
  setCart,
} from "~/entities/Catalog";
import { Preloader } from "~/shared/ui";
import Routes from "~/shared/routes";

export default function CartPage() {
  const [triedLoad, setTriedLoad] = useState(false);
  const [isLoading, formDisabled, catalog, cart] = useUnit([
    getCatalogFx.pending,
    createApplicationFx.pending,
    $catalog,
    $cart,
  ]);
  useEffect(() => {
    if (catalog.houses.length === 0 || catalog.mafs.length === 0) {
      getCatalogFx().then(() => setTriedLoad(true));
    }
  }, []);
  useEffect(() => {
    if (triedLoad)
      setCart(
        cart.filter((item) => {
          return Boolean(
            catalog[`${item.item_type}s`].find((el) => el.id === item.id)
          );
        })
      );
  }, [triedLoad]);

  const [data, setData] = useState({ full_name: "", contact: "" });
  const [show, setShow] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(createApplicationFx({ ...data, cart }), {
      loading: "Отправляем заявку...",
      success: () => {
        setShow(false);
        setData({ full_name: "", contact: "" });
        return "Заявка успешно отправлена!";
      },
      error: (error) => `Ошибка при отправке заявки: ${error}`,
    });
  };
  const onReset = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
    setData({ full_name: "", contact: "" });
  };

  if (isLoading) return <Preloader />;
  return (
    <div className="cart-page">
      <BackBtnContainer grayBg={false} />
      <h1>корзина{cart.length !== 0 && ` (${cart.length})`}</h1>
      {cart.length === 0 ? (
        <div className="empty">
          <h3>Ваша корзина пуста...</h3>
          <Link className="rounded-gray-btn" to={Routes.CATALOG_3D}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Наименование товара</th>
                <th>Кол-во</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, key) => (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>
                    <div className="amount-wrapper">
                      <button
                        onClick={() =>
                          item.amount > 1 &&
                          setCart(
                            cart.map((el) =>
                              el.item_type === item.item_type &&
                              el.id === item.id
                                ? { ...item, amount: item.amount - 1 }
                                : el
                            )
                          )
                        }
                      >
                        <AiOutlineMinus />
                      </button>
                      <span>{item.amount}</span>
                      <button
                        onClick={() =>
                          setCart(
                            cart.map((el) =>
                              el.item_type === item.item_type &&
                              el.id === item.id
                                ? { ...item, amount: item.amount + 1 }
                                : el
                            )
                          )
                        }
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        setCart(
                          cart.filter(
                            (el) =>
                              !(
                                el.item_type === item.item_type &&
                                el.id === item.id
                              )
                          )
                        )
                      }
                    >
                      <IoMdClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            id="open-application-modal-btn"
            className="rounded-gray-btn"
            onClick={() => setShow(true)}
          >
            Оставить заявку
          </button>
          <Modal
            open={show}
            onCancel={() => setShow(false)}
            footer={null}
            centered
            destroyOnHidden
            maskClosable={true}
            closeIcon={null}
            styles={{
              content: {
                minWidth: "calc((1100 / 1920) * 100vw)",
                padding: "6vh 7vw 13vh",
                justifySelf: "center",
                borderRadius: "6rem",
              },
            }}
          >
            <form id="application-form" onSubmit={onSubmit} onReset={onReset}>
              <div className="title">
                Оставьте свои контакты наш менеджер свяжется с вами
              </div>
              <div className="form-group">
                <label htmlFor="full_name">Ваше имя</label>
                <input
                  id="full_name"
                  placeholder="Введите текст"
                  value={data.full_name}
                  onChange={(e) =>
                    setData({ ...data, full_name: e.target.value })
                  }
                  type="text"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">тел/Email</label>
                <input
                  id="contact"
                  placeholder="Введите текст"
                  value={data.contact}
                  onChange={(e) =>
                    setData({ ...data, contact: e.target.value })
                  }
                  type="text"
                  required
                />
              </div>
              <button
                className="rounded-gray-btn"
                type="submit"
                disabled={formDisabled}
              >
                Отправить
              </button>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
}
