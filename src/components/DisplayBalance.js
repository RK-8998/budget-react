import React from "react";
import { Statistic } from "semantic-ui-react";

const DisplayBalance = ({ title, value, color, size = "tiny" }) => {
  return (
    <Statistic size={size} color={color}>
      <Statistic.Label style={{ textAlign: "center" }}>{title}</Statistic.Label>
      <Statistic.Value>{value}</Statistic.Value>
    </Statistic>
  );
};

export default DisplayBalance;
