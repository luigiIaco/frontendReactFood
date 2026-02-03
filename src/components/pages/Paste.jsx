import React, { useEffect, useState } from "react";
import { getPopularService } from "../../service/recipes/recipes.service";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Card from "../../ui/Card";

const Paste = () => {
  const localstorageKey = "paste";
  const [paste, setPaste] = useState([]);
  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {
    getPaste();
  }, []);

  const generaPrezzo = () => {
    const nuovoPrezzo = (Math.random() * (50 - 5) + 5).toFixed(2);
    return Number(nuovoPrezzo);
  };

  const getPaste = async () => {
    const localstore = localStorage.getItem(localstorageKey);
    if (localstore) {
      setPaste(JSON.parse(localstore));
    } else {
      const data = await getPopularService(5, "pasta");
      if (data && data.recipes) {
        localStorage.setItem(localstorageKey, JSON.stringify(data.recipes));
        setPaste(data.recipes);
      }
    }
  };
  return (
    <Wrapper>
      <Splide
        options={{
          perPage: 2,
          pagination: false,
          arrows: true,
        }}
      >
        {paste.map((item) => {
          return (
            <SplideSlide key={item.id}>
              <Card
                key={item.id}
                item={item}
                generaPrezzo={generaPrezzo}
                cartStatus={cartStatus}
                setCartStatus={setCartStatus}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 7rem 0rem;
  width: 100%;
  overflow: hidden;
`;

export default Paste;
