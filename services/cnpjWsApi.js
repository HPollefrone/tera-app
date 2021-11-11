import axios from "axios";

const API_TOKEN = process.env.CNPJWS_API_TOKEN || "TYBtP0iLWfu34TXKLWWCgVNcsJFrdSJJ4JNa3zwIX81-";

async function consultarCnpj(cnpj) {
  const response = await axios.get(`https://comercial.cnpj.ws/cnpj/${cnpj}?token=${API_TOKEN}`);
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
