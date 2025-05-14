import { useCEP } from "@/services/cepService";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { InputComponent } from "@/components/input";

interface CEPFormData {
  cep: string;
}

export function CEPChecker() {
  const { register, handleSubmit, watch } = useForm<CEPFormData>();
  const watchedCEP = watch("cep") || "";

  const [cep, setCEP] = useLocalStorageState<string | undefined>("savedCEP", undefined);
  const { data: address, isLoading, error } = useCEP(cep);

  const onSubmit = (data: CEPFormData) => {
    if (data.cep.length === 8) {
      setCEP(data.cep);
    }
  };


  const formatCEP = (cep: string) => cep.replace(/(\d{5})(\d{3})/, "$1-$2");

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Calcular frete</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-2">
          <div className="flex-1">
            <InputComponent
              name="cep"
              type="text"
              placeholder="Digite o CEP"
              register={register}
            />
          </div>
          <button
            type="submit"
            disabled={watchedCEP.length !== 8}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Calcular
          </button>
        </div>
      </form>

      {watchedCEP.length > 0 && watchedCEP.length < 8 && (
        <p className="mt-2 text-sm text-amber-600">O CEP deve conter 8 dígitos</p>
      )}

      {isLoading && (
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Consultando CEP...
        </div>
      )}

      {error && (
        <div className="mt-3 text-sm text-red-600">
          {error instanceof Error ? error.message : "Erro ao buscar o CEP"}
        </div>
      )}

      {address && !isLoading && (
        <div className="mt-3 space-y-2">
          <p className="font-medium text-gray-900">
            Endereço para CEP {formatCEP(address.cep)}:
          </p>
          <p className="text-sm text-gray-600">
            {address.logradouro}
            {address.complemento && `, ${address.complemento}`}
          </p>
          <p className="text-sm text-gray-600">
            {address.bairro}, {address.localidade} - {address.uf}
          </p>
          <div className="pt-2">
            <p className="text-sm font-medium text-gray-900">Opções de entrega:</p>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center p-2 border border-gray-200 rounded bg-white">
                <div>
                  <p className="font-medium">Entrega Padrão</p>
                  <p className="text-sm text-gray-500">7-10 dias úteis</p>
                </div>
                <p className="font-medium text-green-600">Grátis</p>
              </div>
              <div className="flex justify-between items-center p-2 border border-gray-200 rounded bg-white">
                <div>
                  <p className="font-medium">Entrega Expressa</p>
                  <p className="text-sm text-gray-500">2-3 dias úteis</p>
                </div>
                <p className="font-medium">R$ 19,90</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
