import React from "react";
import { Button } from "semantic-ui-react";

const ButtonSaveOrCancel = () => {
  return (
    <Button.Group style={{ marginTop: 10 }}>
      <Button>CANCEL</Button>
      <Button.Or />
      <Button primary>SAVE</Button>
    </Button.Group>
  );
};

export default ButtonSaveOrCancel;
