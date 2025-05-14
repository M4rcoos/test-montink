
import { useCart } from "@/context/context-cart";
import type { Product } from "@/entities/product";
import { config } from "@/config/storage";

import iconLixo from "@/assets/lixeira.svg";
import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { CEPChecker } from "@/components/CEP-checker";
import { dummyProduct } from "@/mocks/products-mocks";

export const Checkout = () => {
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedSizeName, setSelectedSizeName] = useState("");

  useEffect(() => {
    const colorItem = localStorage.getItem("selectedColor");
    const sizeItem = localStorage.getItem("selectedSize");

    if (colorItem) {
      const colorParsed = JSON.parse(colorItem);
      const colorId = colorParsed.value;
      const color = dummyProduct.colors.find((c) => c.id === colorId);
      if (color) setSelectedColorName(color.name);
    }

    if (sizeItem) {
      const sizeParsed = JSON.parse(sizeItem);
      const sizeId = sizeParsed.value;
      const size = dummyProduct.sizes.find((s) => s.id === sizeId);
      if (size) setSelectedSizeName(size.name);
    }
  }, []);

  const { addItemToCart, removeMinusOne, removeItemFromCart } = useCart();
  const delivery: number = 0

  const productsInCart: Product[] = JSON.parse(
    localStorage.getItem(config.LOCAL_STORAGE_ITENS_CART) || "[]"
  );
  console.log("🚀 ~ Checkout ~ productsInCart:", productsInCart)

  const navigate = useNavigate();


  useEffect(() => {
    if (!productsInCart || productsInCart.length === 0) {
      navigate("/");
    }
  }, [productsInCart, navigate]);

  const handleAddToCart = (item: Product) => addItemToCart(item);
  const handleRemoveFromCart = (item: Product) => removeItemFromCart(item?.id);
  const handleMinusOne = (item: Product) => removeMinusOne(item?.id);




  return (
    <div className="mt-8 flex flex-col gap-10 px-4 lg:flex-row lg:px-40 w-full">

      {/* Bloco do formulário de CEP */}
      <div className="w-full lg:w-1/2">
        <CEPChecker />
      </div>

      {/* Bloco dos produtos no carrinho */}
      <div className="w-full lg:w-1/2">
        <h3 className="mb-4 font-baloo text-title-l text-base-title">
          Produtos selecionados
        </h3>
        <div className="w-full rounded-md bg-gray-100 p-6">
          <div>
            {productsInCart.map((item) => (
              <div key={item.id} className="flex gap-5">
                <img src={item.images[0].url} width={64} height={64} />
                <span>
                  {item.name} (x{item.quantidade})
                  <div className="flex gap-2 rounded-md flex-col">
                    <p>COR: {selectedColorName}</p>
                    <p>TAM: {selectedSizeName}</p>
                    <div className="flex w-16 items-center justify-around gap-2 rounded-md bg-base-button px-2">
                      <button
                        className="font-roboto text-xl text-purple"
                        onClick={() => handleMinusOne(item)}
                      >
                        -
                      </button>
                      <span className="text-base-text">
                        {item.quantidade}
                      </span>
                      <button
                        className="font-roboto text-base text-purple"
                        onClick={() => handleAddToCart(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-1 rounded-md bg-base-button p-2 min-w-min w-28">
                      <img src={iconLixo} />
                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className="font-roboto text-text-s text-base-text"
                      >
                        REMOVER
                      </button>
                    </div>
                  </div>
                </span>
                <span className="font-bold">R$ {item.price.toFixed(2)}</span>
              </div>
            ))}

            <div className="mt-4 border-t border-gray-300 pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Total de itens</span>
                <span>
                  R${" "}
                  {productsInCart
                    .reduce(
                      (acc, item) => acc + item.price * item.quantidade,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Entrega</span>
                <span>{`R$${delivery.toFixed(2)}`}</span>

              </div>
              <div className="flex justify-between">
                <span className="text-text-l font-bold">Total</span>
                <span className="text-text-l font-bold">
                  R${" "}
                  {productsInCart
                    .reduce(
                      (acc, item) => acc + item.price * item.quantidade + delivery,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                onClick={() => navigate("/orderConfirmed")}
              >
                CONFIRMAR PEDIDO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
