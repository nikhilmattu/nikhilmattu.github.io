import styled from "styled-components";

export const TrainWrapper = styled.div`
    display: flex;
`

// for later:
// border-right: 1px dotted black;
// width: 30%;

export const StationsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > button {
    display: flex;
    width: fit-content;
    background: none;
    border: none;
    border-bottom: 1px solid black;
    cursor: pointer;
    margin-bottom: 8px;
    padding-bottom: 4px;
    :hover {
        color: blue;
    }
  }
`