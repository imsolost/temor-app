import React from "react";
import { Col, Row, Container } from "../components/Grid";

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
