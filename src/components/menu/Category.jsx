import React from "react";
import styled from "styled-components";
import { CiHome } from "react-icons/ci";
import { CiPizza } from "react-icons/ci";
import { PiHamburger } from "react-icons/pi";
import { GiSushis } from "react-icons/gi";
import { WiNightAltHail } from "react-icons/wi";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <List>
      <Slink to={"/cucina/italian"}>
        <CiPizza />
        <h4>Italian</h4>
      </Slink>
      <Slink to={"/cucina/american"}>
        <PiHamburger />
        <h4>American</h4>
      </Slink>
      <Slink to={"/cucina/japanese"}>
        <GiSushis />
        <h4>Japanese</h4>
      </Slink>
      <Slink to={"/cucina/thai"}>
        <WiNightAltHail />
        <h4>Thai</h4>
      </Slink>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 0;
  flex-wrap: wrap;
`;

const Slink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 50px;
  transition: all 0.3s;
  
  h4 { font-size: 0.9rem; color: #6b7280; }
  svg { font-size: 1.2rem; color: #6b7280; }

  &.active {
    background: #5b8c5a;
    border-color: #5b8c5a;
    h4, svg { color: white; }
    box-shadow: 0 4px 12px rgba(91, 140, 90, 0.3);
  }

  &:hover:not(.active) {
    background: #f3f4f6;
    transform: translateY(-2px);
  }
`;

export default Category;
