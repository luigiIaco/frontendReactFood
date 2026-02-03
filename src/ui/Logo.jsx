import React from "react";
import { IoLogoDesignernews } from "react-icons/io";
import styled from "styled-components";

const Logo = () => {
  return (
    <>
      <Image>
        <IoLogoDesignernews />
      </Image>
    </>
  );
};

const Image = styled.div`
  position: absolute;
  left: 15px;
  svg {
    width: 50px;
    height: 50px;
  }
`;

export default Logo;
