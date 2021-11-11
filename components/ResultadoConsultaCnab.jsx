function Similaridades({ resultado }) {
  return (
    <div>
      <h4>⚠️ Atenção!  Nomes Similares:</h4>
      <ul>
        {resultado?.map(s =>
          (<li key={s.nomeSacado}>{s.nomeSacado} e {s.nomeCedente}</li>)
        )}
      </ul>
    </div>
  );
}

export default function ResultadoConsultaCnab({ consultaCnab }) {
  if (!consultaCnab)
    return (<></>);

  return (
    <div className="card mt-3 shadow-lg mb-6">
      <div className="container-fluid row">
        <div className="col-md-12 p-2">
          <div>
            <h4>Cedentes</h4>
            <span>{consultaCnab.cedentes?.map(c => c.nome).join(", ")}</span>
          </div>

          {consultaCnab.cnpjSacado?.length > 0 &&
            (<div>
              <h4>CNPJ do sacado</h4>
              <span>{consultaCnab.cnpjSacado?.join(", ")}</span>
            </div>)}

          <div className="text-danger">
            {consultaCnab.similarityFlag &&
              (<Similaridades resultado={consultaCnab.similaridades} />)}
          </div>

          <div id="#texto1" className="text-danger"></div>

          <div className="text-success">
            {!consultaCnab.similarityFlag &&
              (<h4> ✅ NÃO FORAM ENCONTRADAS SIMILARIDADES ENTRE OS NOMES</h4>)}
          </div>
        </div>
      </div>
    </div>
  )
}
