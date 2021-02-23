import React from "react";
import { Container } from "react-bootstrap";
import ResetPassword from "./ResetPassword";

const styles = {
  container: {
    marginTop: "40px",
  },
};

function App() {
  return (
    <Container className="col-md-4 offset-md-4" style={styles.container}>
      <ResetPassword />
    </Container>
  );
}

export default App;
