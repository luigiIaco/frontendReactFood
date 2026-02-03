import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components";

const Loader = () => {
  return (
    <div>
      <Loading>
        <p>Loading...</p>
        <AiOutlineLoading3Quarters />
      </Loading>
    </div>
  );
};

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export default Loader;
