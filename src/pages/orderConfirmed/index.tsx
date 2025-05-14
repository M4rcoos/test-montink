import entregador from "@/assets/entregador.svg";

import iconRelogio from '@/assets/icon-rounded-clock.svg'
import iconPayment from '@/assets/icon-rounded-payment.svg'


export const OrderConfirmation = () => {

  return (
    <div className="mt-20 flex min-h-screen items-start justify-center">
      <div>
        <div className="mb-10 text-start">
          <h1 className="text-3xl font-bold text-yellow-600">
            Uhu! Pedido confirmado
          </h1>
          <p className="text-lg text-gray-600">
            Agora é só aguardar que logo seu pedido chegará até você
          </p>
        </div>

        {/* Card de informações */}
        <div className="rounded-tr-3xl rounded-bl-3xl bg-gradient-to-r from-yellow via-purple to-purple p-[1px]">
          <div className="rounded-tr-3xl rounded-bl-3xl bg-white p-6">

            <div className="mb-4 flex items-start gap-2">
              <img src={iconRelogio} />
              <div>
                <p className="text-gray-700 font-bold">Previsão de entrega</p>
                <p className="text-gray-900">20 min - 30 min</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={iconPayment} />
              <div>
                <p className="text-gray-700 font-bold">Pagamento na entrega</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Imagem do entregador */}
      <div className="ml-8">
        <img src={entregador} alt="Entregador" className="w-96 rounded-md" />
      </div>
    </div>
  );
};
