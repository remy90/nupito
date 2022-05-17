import styled from '@emotion/styled';
import { Box, ListItem } from '@mui/material';

export const ImageContainer = styled(Box)`
width: 100%;
max-height: 50%;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: contain;
    min-width: 100%;
    position: relative !important;
    height: unset !important;
  }
`;

export const SpacedListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
