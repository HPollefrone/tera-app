import { useRef } from 'react';
import axios from "axios";

export default function UploadArquivo({ setConsultaCnab, setLoading }) {
  const fileInput = useRef(null);

  const updateUI = (data) => {
    setConsultaCnab(data);
    setLoading(!data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    updateUI(null);
    
    const { data } = await postUploadArquivo(fileInput.current?.files[0]);
    console.log("form submit", fileInput.current.files, data);

    updateUI(data);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="arquivo" className="form-label">Arquivo CNAB</label>
        <input type="file" className="form-control" id="arquivo" name="arquivo" ref={fileInput} />
      </div>

      <button type="submit" className="btn btn-primary">Enviar arquivo</button>
    </form>
  );
}

async function postUploadArquivo(arquivo) {
  if (!arquivo) return;
  try {
    const data = new FormData();
    data.append("arquivo", arquivo, arquivo.name);

    const response = await axios.post("/api/upload", data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    });

    return response.data;
  } catch (error) {
    console.error("ocorreu um erro ao enviar o arquivo", error);
    return {};
  }
}
