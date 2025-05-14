import type { Product } from "@/entities/product";

export const dummyProduct: Product = {
    id: "1",
    name: "Tênis Esportivo Ultralight Performance",
    price: 299.90,
    quantidade: 1,
    description: "Tênis esportivo de alta performance com tecnologia de amortecimento avançada e design ultramoderno. Perfeito para corridas, treinos e uso casual.",
    images: [
        {
            id: "img1",
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            alt: "Tênis vermelho e preto"
        },
        {
            id: "img2",
            url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
            alt: "Tênis em detalhe lateral"
        },
        {
            id: "img3",
            url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
            alt: "Tênis branco vista de cima"
        },
        {
            id: "img4",
            url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
            alt: "Tênis em uso durante corrida"
        }
    ],
    colors: [
        { id: "color1", name: "Vermelho", value: "#E53E3E" },
        { id: "color2", name: "Azul", value: "#3182CE" },
        { id: "color3", name: "Preto", value: "#2D3748" },
        { id: "color4", name: "Branco", value: "#F7FAFC" }
    ],
    sizes: [
        { id: "size1", name: "Tamanho 38", value: "38" },
        { id: "size2", name: "Tamanho 39", value: "39" },
        { id: "size3", name: "Tamanho 40", value: "40" },
        { id: "size4", name: "Tamanho 41", value: "41" },
        { id: "size5", name: "Tamanho 42", value: "42" },
        { id: "size6", name: "Tamanho 43", value: "43" }
    ]
};