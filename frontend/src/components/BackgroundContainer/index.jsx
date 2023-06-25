import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

import SplitwiserNav from "../SplitwiserNav";

import "./index.scss";

const BackgroundContainer = ({ children, className }) => (
  <div className={`background-container ${className}`}>
    <SplitwiserNav />
    <Container className="my-5">{children}</Container>
  </div>
);

export default BackgroundContainer;

BackgroundContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

BackgroundContainer.defaultPropTypes = {
  className: "background-container",
};
