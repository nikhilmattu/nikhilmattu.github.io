import React from "react";
import { useLocation } from "react-router";
import { NavBarWrapper, StyledLink } from "./styles";

type Props = {};

enum ROUTES {
  HOME = "/",
  EXPERIENCE = "/experience",
  PORTFOLIO = "/portfolio",
  APPS = "/apps",
}

const NavBar: React.FC<Props> = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <NavBarWrapper>
      <div>
        <StyledLink isActive={activePath === ROUTES.HOME} to={ROUTES.HOME}>
          Home
        </StyledLink>
        <StyledLink
          isActive={activePath === ROUTES.EXPERIENCE}
          to={ROUTES.EXPERIENCE}
        >
          Experience
        </StyledLink>
        <StyledLink
          isActive={activePath === ROUTES.PORTFOLIO}
          to={ROUTES.PORTFOLIO}
        >
          Portfolio
        </StyledLink>
        <StyledLink isActive={activePath === ROUTES.APPS} to={ROUTES.APPS}>
          Apps
        </StyledLink>
      </div>
    </NavBarWrapper>
  );
};

export default NavBar;
