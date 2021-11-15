import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
`;

export const StickToEndOfContainer = styled.div`
  margin-top: auto;
`;