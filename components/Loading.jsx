import styles from '../styles/components/Loading.module.scss';

export default function Loading() {
  const loader = `d-flex justify-content-center ${styles.loader}`;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 ">
          <div className={loader} role="status">
            <span className="sr-only">carregando...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
