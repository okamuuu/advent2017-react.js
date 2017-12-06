// import React, { Components } from "react"
import styled from "styled-components"

export default styled.div`
  /* Adapt the colours based on primary prop */
  display: inline-block;
  background: ${props => props.primary ? '#0275d8' : 'white'};
  color: ${props => props.primary ? 'white' : '#ccc'};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${props => props.primary ? '#0275d8' : '#ccc'};
  border-radius: 3px;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  opacity: ${props => props.disabled ? 0.65 : 1};
  &:hover {
    opacity: ${props => props.disabled ? 0.65 : 0.8};
  }
`;
