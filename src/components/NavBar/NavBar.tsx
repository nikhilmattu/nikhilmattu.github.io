import React from "react";
import { useLocation } from "react-router";
import { NavBarWrapper, StyledLink } from "./styles";

type Props = {};

enum ROUTES {
  HOME = "/",
  EXPERIENCE = "/experience",
  PORTFOLIO = "/portfolio",
}

const NavBar: React.FC<Props> = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <NavBarWrapper>
      <StyledLink isActive={activePath === ROUTES.HOME} to="/">
        Home
      </StyledLink>
      <StyledLink isActive={activePath === ROUTES.EXPERIENCE} to="/experience">
        Experience
      </StyledLink>
      <StyledLink isActive={activePath === ROUTES.PORTFOLIO} to="/portfolio">
        Portfolio
      </StyledLink>
    </NavBarWrapper>
  );
};

export default NavBar;
