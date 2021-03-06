import { useReactiveVar } from "@apollo/client";
import { filmSearchResultVar } from "graphql/reactiveVars";
import Modal from "react-bootstrap/Modal";
import { CgSearchFound } from "react-icons/cg";
import styles from "styles/Home.module.css";
import { SearchResultModalPropsType } from "types";
import MovieCard from "./MovieCard";
import Alert from "react-bootstrap/Alert";

export default function SearchResultModal({
  show,
  setShow,
}: SearchResultModalPropsType) {
  const { Search: searchResults } = useReactiveVar(filmSearchResultVar);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <CgSearchFound /> Search Results ({searchResults?.length || 0})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.grid}>
        {searchResults?searchResults.map((movie) => (
          <MovieCard key={movie.imdbID} {...movie} />
        )):(
        <Alert variant="danger">
          Oops! Movie not available
        </Alert>
      )}
      </Modal.Body>
    </Modal>
  );
}
