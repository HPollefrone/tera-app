import axios from "axios";

const BASE_API_URL = process.env.CNPJWS_API_URL;
const API_TOKEN = process.env.CNPJWS_API_TOKEN;

async function consultarCnpj(cnpj) {
  const response = await axios.get(`${BASE_API_URL}/${cnpj}?token=${API_TOKEN}`);
  console.log(response);
  return response.data;
}

export default async function* consultarListaCnpj(lista) {
  for (const cnpj of lista) {
    try {
      const data = await consultarCnpj(cnpj);
      yield { idx: lista.indexOf(cnpj), data };
    } catch (error) {
      console.error(error);
      yield {}
    }
  }
}
