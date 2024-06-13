export interface Guitarra {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

// Aplicamos herencia
export interface CartItem extends Guitarra {     cantidad: number; }

// Con Pick<> podemos seleccionar solo las propiedades que queremos de Guitarra ///
// export type CartItem = Pick<Guitarra, 'id' | 'name' | 'price'> & {
//     cantidad: number
// };

// Usa Omit para excluir las propiedades que no queremos de Guitarra //
// export type CartItem = Omit<Guitarra, 'description' | 'image'> & {
//     cantidad: number}

// export type GuitarID = Pick<Guitarra, 'id'>; // esta es una manera de seleccionar solo el id de Guitarra

export type GuitarID = Guitarra['id']; // esta es otra manera de seleccionar solo
// el id de Guitarra mas corta