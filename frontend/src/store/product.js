import { create } from "zustand";

// export so that can use in other files also
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => ({ products }),
  createProduct: async (newProduct) => {
    if(!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
    const data = await res.json();
    set((state) => ({products:[...state.products, data]}));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  // now write functionality for delete button when click then able to delete the product
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) return { success: false, message: data.message };

    set(state => ({ products: state.products.filter(product => product._id !== pid)}));
    return { success: true, message: data.message };
  }
}));