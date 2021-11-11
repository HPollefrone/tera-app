// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

import nextConnect from "next-connect";
import multer from "multer";
import processarArquivo from "../../services/cnabService";

const upload = multer();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Ocorreu um erro! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("arquivo"));

apiRoute.post(async (req, res) => {
  try {
    console.log(req.file);
    if (req.file) {
      const result = await processarArquivo(req.file.buffer);
      console.log(result);
      if (!result.erros) {
        res.status(200).json({ data: result });
      }

      return res.status(500).json({ error: result.erros });
    }
  } catch (error) {
    console.error("ocorreu um erro ao processar o arquivo enviado", error);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
