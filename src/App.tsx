import { Guitar } from './components/Guitar'
import { Header } from './components/Header'
import './index.css'
import { useCart } from './hooks/useCart';

function App() {

 const {
  data, cart, addToCart, handleAdd, removeFromCart, handleDelete, clearCart,errorMessage, totalPagar, isEmpty
 } = useCart();
 

  return (
    <>
      <Header 
      // Son props que podemos pasar, no importa si es un state o incluso funciones
        cart={cart}
        removeFromCart={removeFromCart}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        errorMessage={errorMessage}
        clearCart={clearCart}
        totalPagar={totalPagar}
        isEmpty={isEmpty}
        
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
                
              />
            ))}


        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA  - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
