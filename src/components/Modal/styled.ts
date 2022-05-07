import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ModalContent = styled(Box)`
  /* position: absolute; */
  top: 50%;
  left: 50%;
  /* transform: translate(-50%; -50%); */
  width: 400;
  bgcolor: 'background.paper';
  border: 2px solid #000;
  box-shadow: 24;
  padding: 1rem;
`;