import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Navbar({ title }) {
  const navbar = `navbar navbar-expand-lg navbar-dark ${styles.navbar}`;

  return (
    <header>
      <nav className={navbar}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex" href="#">
            <Image src="/img/logo-tera-b.png" alt="Logo Tera" width={30} height={30} className="d-inline-block align-text-top" />
            <span className="ms-2">{title}</span>
          </a>

          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          </div> */}
        </div>
      </nav>
    </header>
  );
}
