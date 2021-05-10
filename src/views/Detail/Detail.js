import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Video from "../../components/Video/Video";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import "./Detail.css";
import axios from "axios";

export default function Detail() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setMovie] = useState({});
  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          "https://plep.herokuapp.com/api/movies"
        );
        setMovies(data);
      } catch (err) {
        console.log(err);
      }
    };

    getMovies().catch(null);
  }, []);

  const location = useLocation();

  useEffect(() => {
    const passedMovie = location.state ? location.state.video : {};
    setMovie(passedMovie);
  }, [location]);

  return (
    <Container fluid className="body">
      <Row noGutters>
        <Col lg={8} md={12}>
          <VideoInfo data={selectedMovie} />
        </Col>
        <Col lg={4} md={12} className="mb-4">
          {movies.map((data) => (
            <Video data={data} key={data._id} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
