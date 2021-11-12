
import ConsultarCnab from './ConsultarCnab';
import Navbar from './Navbar';

export default function Home({ title, isSSR }) {
  return (
    <>
      <Navbar title={title} />

      <main className="container-fluid mt-3">
        <div>
          {isSSR
            ? (<h2>SSR Working</h2>)
            : (<h2>SSR Not Works</h2>)}
        </div>
        <ConsultarCnab />
      </main>
    </>
  );
}
