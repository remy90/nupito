import { styled } from '@mui/material/styles';

export const ColouredWord = styled('p')`
  display: inline;
  flex-wrap: wrap;
  color: ${props => props.color};
`;
