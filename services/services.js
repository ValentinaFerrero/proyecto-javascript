import { renderizarProductos } from "../js/index.js";

const getProductos = async ()=>{
    try {
        const res = await fetch ("../assets/productos.json")
        const data = await res.json ();
        renderizarProductos (data);

    } catch (error) {
        console.log (error)
    }
}

export { getProductos }