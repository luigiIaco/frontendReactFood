import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipesInformation } from "../../service/recipes/recipes.service";
import styled from "styled-components";
import { motion } from "framer-motion";
import Loader from "../../ui/Loader";

const Details = () => {
  const { id } = useParams();
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("instructions");
  const [oscillaIns, setOscillaIns] = useState(false);
  const [oscillaSum, setOscillaSum] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);

      const data = await getRecipesInformation(id);
      if (data) {
        setInformation(data);
      }
      setLoading(false);
    };
    getDetails();
  }, [id]);

  return (
    <>
      {loading && <Loader />}

      {information && !loading && (
        <DetailWrapper>
          <img
            src={information.image}
            alt=""
            style={{ width: "40%", height: "40%", borderRadius: "50%" }}
          />
          <Info>
            <motion.button
              onClick={() => {
                setOscillaIns(!oscillaIns);
                setOscillaSum(false);
                setTab("instructions");
              }}
              animate={oscillaIns ? { rotate: [-5, 5, -5] } : { rotate: 0 }}
              transition={{
                duration: 1,
                repeat: oscillaIns ? Infinity : 0,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                backgroundColor: oscillaIns ? "#16A34A" : "#4F46E5",
                color: "white",
                border: oscillaIns ? "2px solid #16A34A" : "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
            >
              Instructions
            </motion.button>

            <motion.button
              onClick={() => {
                setOscillaSum(!oscillaSum);
                setOscillaIns(false);
                setTab("summary");
              }}
              animate={oscillaSum ? { rotate: [-5, 5, -5] } : { rotate: 0 }}
              transition={{
                duration: 1,
                repeat: oscillaSum ? Infinity : 0,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                backgroundColor: oscillaSum ? "#16A34A" : "#4F46E5",
                color: "white",
                border: oscillaSum ? "2px solid #16A34A" : "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
            >
              Summary
            </motion.button>
            {tab === "instructions" && (
              <p
                dangerouslySetInnerHTML={{ __html: information.instructions }}
              ></p>
            )}
            {tab === "summary" && (
              <p dangerouslySetInnerHTML={{ __html: information.summary }}></p>
            )}
          </Info>
        </DetailWrapper>
      )}
    </>
  );
};

const DetailWrapper = styled.div`
  position: relative;
  div {
    width: 50%;
    font-size: 10px;
    margin-right: 10px;
  }
  li {
    list-style: initial;
  }
  p {
    margin-top: 8px;
  }

  button {
    background-color: #4caf50; /* Verde principale */
    border: none;
    color: white;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer;
    margin-right: 10px;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 60%;
`;

export default Details;
