import { useState } from 'react';
import ResultadoConsultaCnab from './ResultadoConsultaCnab';
import UploadArquivo from './UploadArquivo';
import Loading from './Loading';

export default function ConsultarCnab() {
  const [consultaCnab, setConsultaCnab] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="p-4 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="row">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">Consultar CNAB</h1>
            <p className="lead">
              Instruções para o upload de arquivo CNAB
              <br />
              Formato do arquivo, tamanho, etc
            </p>
            {/* <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Primary</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Default</button>
          </div> */}
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden">
            <UploadArquivo setConsultaCnab={setConsultaCnab} setLoading={setLoading} />
          </div>
        </div>
      </div>

      {consultaCnab && (<ResultadoConsultaCnab consultaCnab={consultaCnab} />)}

      {loading && (<Loading />)}
      {/* <div className="col-md-4 mt-3">
        <h2 className="title1">Consultar CNAB</h2>
        <form action="/consultar-cnab" method="post" encType="multipart/form-data">
          <input type="file" className="input-cnab form-control-file border" id="arquivo" name="arquivo" />

          <button type="submit">Enviar arquivo</button>
        </form>
      </div>

      <div className="d-flex flex-column">
        <div className="m-3 d-flex justify-content-center">
          <h3>Informações do CNAB:</h3>
        </div>

        <div id="box-info" className="container-fluid mt-3">
          <div className="container-fluid row">
            <div className="col-md-12 m-2">
              <div id="#cedente"></div>
              <div id="#texto" className="text-danger"></div>
              <div id="#texto1" className="text-danger"></div>
              <div id="#cnpjSacado"></div>
              <div id="#cnabOk" className="text-success"></div>
            </div>
          </div>

          <div id="carregando" className="container">
            <div className="row">
              <div id="carregando" className="col-12 ">
                <div id="loading" className=" d-flex justify-content-center loader" role="status">
                  <span className="sr-only">carregando...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
