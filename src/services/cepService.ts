
import { useQuery } from "@tanstack/react-query";

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export const fetchAddressByCEP = async (cep: string): Promise<ViaCEPResponse> => {
  if (!cep || cep.length !== 8) {
    throw new Error("CEP inválido");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  
  if (!response.ok) {
    throw new Error("Falha ao buscar CEP");
  }

  const data = await response.json();
  
  if (data.erro) {
    throw new Error("CEP não encontrado");
  }
  
  return data;
};

export const useCEP = (cep: string | undefined) => {
  return useQuery({
    queryKey: ["cep", cep],
    queryFn: () => fetchAddressByCEP(cep || ""),
    enabled: !!cep && cep.length === 8,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
