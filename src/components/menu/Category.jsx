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
      <Slink to={"/home"}>
        <CiHome />
        <h4>Home</h4>
      </Slink>
      <Slink to={"cucina/italian"}>
        <CiPizza />
        <h4>Italian</h4>
      </Slink>
      <Slink to={"cucina/american"}>
        <PiHamburger />
        <h4>American</h4>
      </Slink>
      <Slink to={"cucina/japanese"}>
        <GiSushis />
        <h4>Japanese</h4>
      </Slink>
      <Slink to={"cucina/thai"}>
        <WiNightAltHail />
        <h4>Thai</h4>
      </Slink>
    </List>
  );
};

const List = styled.div`
  margin: 2rem 0rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Slink = styled(NavLink)`
  margin-right: 10px;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 50%;
  width: 100px;
  height: 90px;
  padding-top: 20px;
  background: #2a7b9b;
  background: linear-gradient(
    90deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(94, 218, 133, 1) 0%,
    rgba(178, 237, 83, 1) 64%
  );
  color: black;
  text-align: center;

  svg {
    width: 100%;
  }

  &.active {
    background: linear-gradient(
      90deg,
      rgba(178, 237, 83, 1) 0%,
      rgba(94, 218, 133, 1) 50%,
      rgba(42, 123, 155, 1) 100%
    );
  }

  &:hover {
    transform: scale(0.9);
  }
`;

export default Category;
