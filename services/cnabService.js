import consultarListaCnpj from './cnpjWsApi';
import { similarity } from "./utils";

function mapearNomesCedentes(arrayApi) {
  return arrayApi.socios.map((socio) => dividirNome(socio.nome));
}

function dividirNome(nome) {
  return { nome, sobrenome: nome.slice(nome.indexOf(" ") + 1) };
}

function processarRespostaConsultaCnpj(arrayApi, cedentes) {
  const result = {
    cnpjSacado: [],
    similaridades: [],
    erros: [],
  };

  if (!cedentes.length > 0) return [result];

  try {
    return arrayApi.socios
      .map((socio, idx) => {
        console.log(
          "socios[%d]: { nome: %s, qualificacao_socio: %s }",
          idx,
          socio.nome,
          JSON.stringify(socio.qualificacao_socio)
        );

        const sacado = dividirNome(socio.nome);
        let similaridades = [],
          cnpjSacado = [];

        for (const cedente of cedentes) {
          let fator = similarity(cedente.sobrenome, sacado.sobrenome);
          if (fator > 0.51) {
            console.log(
              "Sobrenomes similares detectado [similaridade %] [cedente] = [tratante] [cnpj]: %d %s = %s %s",
              fator,
              socio.nome,
              cedente.nome,
              arrayApi.estabelecimento.cnpj
            );

            similaridades.push({
              nomeSacado: socio.nome,
              nomeCedente: cedente.nome,
            });
            cnpjSacado.push(arrayApi.estabelecimento.cnpj);
          }
        }

        return { similaridades, cnpjSacado };
      })
      .filter((x) => x); // -> remove itens vazios da lista
  } catch (error) {
    console.error(error);
    result.erros = [error];
  }

  return [result];
}

export default async function processarArquivo(arquivo) {
  const text = arquivo.toString();
  const matches = text.match(/0{3}\d{15}[a-zA-Z]+/gi);
  const userData = [...new Set(matches)]; // -> tratamento para cnpj duplicado

  const listaCnpj = userData.map((line) => {
    // tratamento para buscar primeiro cnpj
    const cnpjWithoutLetters = line.split(/[a-zA-Z]+/)[0];
    return cnpjWithoutLetters.substring(cnpjWithoutLetters.length - 14);
  });

  let erros = [];
  let result = {
    cedentes: [],
    cnpjSacado: [],
    similarityFlag: false,
    similaridades: [],
    erros: undefined,
  };

  for await (const { idx, data } of consultarListaCnpj(listaCnpj)) {
    if (idx === 0) {
      result.cedentes = mapearNomesCedentes(data);
    } else {
      const resultadoSimilaridades = processarRespostaConsultaCnpj(
        data,
        result.cedentes
      );
      for (const res of resultadoSimilaridades) {
        if (!res.error) {
          result.cnpjSacado.push(...res.cnpjSacado);
          result.similaridades.push(...res.similaridades);
        } else {
          erros.push(res.error);
        }
      }
    }
  }

  result.similarityFlag = result.similaridades.length > 0;
  if (erros.length) return { ...result, erros };
  return result;
}
