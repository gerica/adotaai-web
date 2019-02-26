import styled from 'styled-components';

export const Container = styled.div`
  width: 450px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
`;
// customBtn:hover {
//   cursor: pointer;
// }

export const SpanLabel = styled.span`
  font-family: serif;
  font-weight: normal;
`;

export const SpanButtonText = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 35px;
  font-size: 14px;
  color: white;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: 'Roboto', sans-serif;
`;
