import React, { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import styled from "styled-components";
import Card from "../../ui/Card";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { getCousineComplexSearch } from "../../service/recipes/recipes.service";

const Searched = () => {
  const { searchValue } = useParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {
    const getSearch = async () => {
      setLoading(true);

      const data = await getCousineComplexSearch(10, "", searchValue);
      setLoading(false);
      if (data && data.results) {
        setResults(data.results);
      }
    };
    getSearch();
  }, [searchValue]);

  const generaPrezzo = () => {
    const nuovoPrezzo = (Math.random() * (50 - 5) + 5).toFixed(2);
    return Number(nuovoPrezzo);
  };

  return (
    <>
      <Title>{_.capitalize(searchValue)}</Title>
      {loading && <Loader />}

      {!loading && (
        <Grid>
          {results.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
                generaPrezzo={generaPrezzo}
                cartStatus={cartStatus}
                setCartStatus={setCartStatus}
              />
            );
          })}
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

export default Searched;
