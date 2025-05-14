
import { useEffect } from "react";
import type { Product } from "@/entities/product";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import { useCart } from "@/context/context-cart";
import { Link } from "react-router-dom";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { cart, addItemToCart, removeMinusOne } = useCart();
  const [selectedSize, setSelectedSize] = useLocalStorageState<string | null>(
    "selectedSize",
    null
  );

  const currentItem = cart.find((cartItem) => cartItem.id === product.id);
  const quantity = currentItem?.quantidade || 0;

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeMinusOne(product.id);
  };

  const [selectedColor, setSelectedColor] = useLocalStorageState<string | null>(
    "selectedColor",
    null
  );

  // Initialize selections if they're null
  useEffect(() => {
    if (selectedSize === null && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].id);
    }

    if (selectedColor === null && product.colors.length > 0) {
      setSelectedColor(product.colors[0].id);
    }
  }, [product, selectedSize, selectedColor, setSelectedSize, setSelectedColor]);


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {product.name}
        </h1>
      </div>

      <div>
        <p className="text-base text-gray-700">{product.description}</p>
      </div>

      {product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900">Cor</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`flex items-center justify-center rounded-full p-1 ${selectedColor === color.id
                  ? "ring-2 ring-blue-500 ring-offset-1"
                  : ""
                  }`}
                title={color.name}
              >
                <span
                  className="h-8 w-8 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.value }}
                ></span>
              </button>
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Selecionado: {product.colors.find(c => c.id === selectedColor)?.name || "Nenhum"}
          </p>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`flex min-w-[3rem] items-center justify-center rounded-md border px-3 py-2 text-sm font-medium ${selectedSize === size.id
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {size.value}
              </button>
            ))}
          </div>
        </div>
      )}

      <footer className='mt-8 mb-5 flex flex-col'>
        <div className='flex items-center gap-1'>
          <p className=' text-text-s font-roboto text-base-text'>R$</p>
          <p className='font-baloo text-2xl font-bold text-base-text'>{product.price.toFixed(2)}</p>
        </div>
        <div className='mr-2 bg-base-button rounded-md flex justify-around items-center gap-2 px-2 w-16'>
          <p>Quantidade</p>
          <div className="flex border border-gray-300 rounded">
            <button
              className="w-8 h-8 text-gray-400 border-r border-gray-300 flex items-center justify-center text-lg"
              onClick={handleRemoveFromCart}
            >
              –
            </button>

            <span className="w-8 h-8 flex items-center justify-center text-gray-500 text-sm">
              {quantity}
            </span>

            <button
              className="w-8 h-8 text-gray-400 border-l border-gray-300 flex items-center justify-center text-lg"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>


        </div>
        <Link to={cart.length > 0 ? '/checkout' : '/'} className=' rounded-md p-2 transition ease-in-out delay-150 bg-purple-dark hover:-translate-y[-20px] hover:scale-110 hover:bg-purple  duration-300'>
          <div className="pt-4">
            <button className="w-full bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
              Adicionar ao carrinho
            </button>
          </div>
        </Link>
      </footer>


    </div>
  );
}
