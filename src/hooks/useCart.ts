import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import { CartItem, Guitarra } from "../models/interfaces";



export const useCart = () => {
    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart);
    const [errorMessage, setErrorMessage] = useState('');


    const addToCart = (item: Guitarra) => {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) { //existe, entonces...
            if (cart[itemExists].cantidad >= MAX_ITEMS) {
                return;
            }
            const copiaCart = [...cart];
            copiaCart[itemExists].cantidad++;
            setCart(copiaCart);
        } else {
            console.log(itemExists);
            // Lo que hicimos es crear una copia del carrito y agregarle el nuevo item, usando
            // el CartItem que creamos en la interfaz de Guitarra en el archivo interfaces.ts 
            const newItem: CartItem = {...item, cantidad: 1};
            setCart([...cart,newItem]);
        }
    }

    const removeFromCart = (item: Guitarra) => {
        const newCart = cart.filter((producto) => producto.id !== item.id);
        setCart(newCart);
    }


    const handleAdd = (item: Guitarra) => {
        const copyCart = [...cart];
        copyCart.map((producto) => {
            if (producto.id === item.id && producto.cantidad < MAX_ITEMS) { // solo se pueden agregar 5 guitarras
                producto.cantidad++;
            }
        });
        setCart(copyCart);
    };

    const handleDelete = (item: Guitarra) => {
        const copyCart = [...cart];
        copyCart.map((producto) => {
            if (producto.id === item.id && producto.cantidad > MIN_ITEMS) {
                producto.cantidad--;
            }
            if (producto.id === item.id && producto.cantidad === MIN_ITEMS) {
                setErrorMessage('No puedes tener menos de 1 guitarra en el carrito');
            }
        });
        setCart(copyCart);
    };

    const clearCart = () => {
        const copyCart: CartItem[] = [];
        setCart(copyCart);
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);

     const totalPagar = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.cantidad, 0),
    [cart]
  );    



    /// useEffects ///

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);


    return {
        data, cart, addToCart, handleAdd, removeFromCart, handleDelete, clearCart, errorMessage, isEmpty, totalPagar    

    }

}
