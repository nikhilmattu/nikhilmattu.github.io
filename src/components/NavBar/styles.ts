import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface NavProps {
  isActive: boolean;
}

export const NavBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-self: flex-start;
  padding: 4px;
`;

export const StyledLink = styled(NavLink)<NavProps>`
  margin: 8px;
  color: ${(props) => (props.isActive ? "gray" : "black")};
  padding: 4px;
  text-decoration: none;
  border-bottom: ${(props) => (props.isActive ? `1px solid black` : `none`)};
`;

export const NavButton = styled.button`
  font-size: 32px;
  background: none;
  outline: none;
  border: 1px solid gray;
  border-radius: 8px;
  cursor: pointer;
`