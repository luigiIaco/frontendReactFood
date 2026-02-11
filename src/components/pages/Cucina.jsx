import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCousineComplexSearch } from "../../service/recipes/recipes.service";
import styled from "styled-components";
import Loader from "../../ui/Loader";
import Card from "../../ui/Card";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Search from "../menu/Search";
import Category from "../menu/Category";

const Cucina = () => {
  const { type } = useParams();
  const [cucina, setCucina] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartStatus, setCartStatus] = useState({});

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  useEffect(() => {
    const getCucina = async () => {
      setLoading(true);
      const data = await getCousineComplexSearch(12, type);
      setLoading(false);
      if (data?.results) setCucina(data.results);
    };
    getCucina();
  }, [type]);

  const generaPrezzo = () => Number((Math.random() * (45 - 8) + 8).toFixed(2));

  return (
    <PageWrapper>
      {/* SEZIONE FILTRI: Qui creiamo il contesto di comando */}
      <ControlPanel>
        <div className="max-w-6xl mx-auto px-6">
          <Search />
          <Category />
        </div>
      </ControlPanel>

      {/* SEZIONE RISULTATI: Qui mostriamo il contenuto */}
      <MainContent>
        <div className="flex flex-col md:flex-row justify-center items-start md:items-end border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-slate-800 capitalize mb-2 text-center">
              Cucina {type}
            </h1>
            <p className="text-slate-500 flex items-center gap-2">
              Esplora la nostra selezione di
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                {cucina.length} piatti
              </span>
              esclusivi
            </p>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <CarouselContainer>
            <SideButton onClick={scrollPrev} className="left-[-25px]">
              <ChevronLeft size={24} />
            </SideButton>

            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              ref={emblaRef}
            >
              <div className="flex gap-6 py-6" id="prodotti">
                {cucina.map((item) => (
                  <div
                    key={item.id}
                    className="flex-[0_0_85%] md:flex-[0_0_30%] min-w-0"
                  >
                    <Card
                      item={item}
                      generaPrezzo={generaPrezzo}
                      cartStatus={cartStatus}
                      setCartStatus={setCartStatus}
                    />
                  </div>
                ))}
              </div>
            </div>

            <SideButton onClick={scrollNext} className="right-[-25px]">
              <ChevronRight size={24} />
            </SideButton>
          </CarouselContainer>
        )}
      </MainContent>
    </PageWrapper>
  );
};

// --- STYLED COMPONENTS PER IL CONTESTO ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc; /* Grigio ardesia molto leggero */
`;

const ControlPanel = styled.section`
  background: white;
  padding: 3rem 0 1rem 0;
  border-bottom: 1px solid #e2e8f0;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Badge = styled.span`
  background: #ecfdf5;
  color: #059669;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid #d1fae5;
`;

const CarouselContainer = styled.div`
  position: relative;
  margin-top: 2rem;
`;

const SideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: white;
  border: 1px solid #e2e8f0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  color: #10b981;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #10b981;
    color: white;
    box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.4);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Cucina;
