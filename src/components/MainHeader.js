import React from "react";
import { Header } from "semantic-ui-react";

const MainHeader = ({ title, type = "h1" }) => {
  return <Header as={type}>{title}</Header>;
};

export default MainHeader;
