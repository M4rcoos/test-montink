
import { ProductImages } from "@/components/product-images";
import { ProductInfo } from "@/components/product-info";

import { dummyProduct } from "@/mocks/products-mocks";
import { NavBreadcrumb } from "@/components/nav-breadcrumb";


export const Index = () => {

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 pb-16">
          <NavBreadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Calçados", href: "/" },
              { name: "Tênis Masculino" },
            ]}
          />


          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product images */}
            <div className="w-full" >
              <ProductImages images={dummyProduct.images} />
            </div>

            {/* Product info */}
            <div className="mt-10 px-0 sm:mt-16 sm:px-0 lg:mt-0">
              <ProductInfo product={dummyProduct} />

            </div>
          </div>

          {/* Product details */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Detalhes do produto</h2>
            <div className="mt-4 prose prose-sm text-gray-600">
              <p>
                O Tênis Esportivo Ultralight Performance foi desenvolvido para oferecer o máximo de conforto e desempenho durante atividades físicas. Com tecnologia de amortecimento avançada, proporciona uma experiência única em cada pisada.
              </p>
              <ul className="mt-4 space-y-2">
                <li>Material externo: mesh respirável e sintético premium</li>
                <li>Solado: borracha antiderrapante com desenho exclusivo</li>
                <li>Tecnologia de amortecimento responsivo</li>
                <li>Peso: 280g (tamanho 40)</li>
                <li>Palmilha removível com tratamento antibacteriano</li>
                <li>Ideal para corridas, caminhadas e treinos em geral</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


