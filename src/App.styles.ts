import styled from "styled-components";
import IconButton from "@material-ui/core/Iconbutton";

export const Wrapper = styled.div`
  margin: 40px;
`;

// styled()でコンポーネントを指定することで、対象のComponentのStyleを変更したものを定義可能。
export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;
