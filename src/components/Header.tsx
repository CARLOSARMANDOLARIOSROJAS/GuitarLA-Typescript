
import { CartItem } from "../models/interfaces";

interface HeaderProps {
  cart: CartItem[];
  removeFromCart: (item: CartItem) => void;
  handleAdd: (item: CartItem) => void;
  handleDelete: (item: CartItem) => void;
  errorMessage: string;
  clearCart: () => void;
  totalPagar: number;
  isEmpty: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  removeFromCart,
  handleAdd,
  handleDelete,
  errorMessage,
  clearCart,
  totalPagar,
  isEmpty 
}) => { /// aqui llamamos las props
  // agregar uno mas con el boton al carrito
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {isEmpty ? (
                  <p className="text-center">El carrito está vacio</p>
                ) : (
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              className="img-fluid"
                              src={`img/${item.image}.jpg`}
                              alt="imagen guitarra"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td className="fw-bold">{item.price}</td>
                          <td className="flex align-items-start gap-4">
                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={() => handleDelete(item)}
                            >
                              -
                            </button>
                            {item.cantidad}
                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={() => handleAdd(item)}
                            >
                              +
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => removeFromCart(item)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <p className="text-end">
                  Total pagar: <span className="fw-bold">{totalPagar}</span>
                </p>
                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
