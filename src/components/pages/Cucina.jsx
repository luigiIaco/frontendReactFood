import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCousineComplexSearch } from "../../service/recipes/recipes.service";
import styled from "styled-components";
import _ from "lodash";
import Loader from "../../ui/Loader";
import Card from "../../ui/Card";

const Cucina = () => {
  const { type } = useParams();
  const [cucina, setCucina] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {
    const getCucina = async () => {
      setLoading(true);

      const data = await getCousineComplexSearch(10, type);
      setLoading(false);
      if (data && data.results) {
        setCucina(data.results);
      }
    };
    getCucina();
  }, [type]);

  const generaPrezzo = () => {
    const nuovoPrezzo = (Math.random() * (50 - 5) + 5).toFixed(2);
    return Number(nuovoPrezzo);
  };

  return (
    <>
      <Title>{_.capitalize(type)}</Title>
      {loading && <Loader />}

      {!loading && (
        <Grid>
          {cucina.map((item) => (
            <Card
              key={item.id}
              item={item}
              generaPrezzo={generaPrezzo}
              cartStatus={cartStatus}
              setCartStatus={setCartStatus}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

const Title = styled.div`
  text-align: center;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export default Cucina;
