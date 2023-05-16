import { useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import {
  allSlidesData,
  currentSlideData,
  slideIndexData,
} from "./components/globalState";
import { QuickLayout, cacheImages, Spinner } from "@nkmwicz/reactpresentation";
import { useEffect, useState } from "react";

function App() {
  const [allSlides, setAllSlides] = useRecoilState(allSlidesData);
  const [index, setIndex] = useRecoilState(slideIndexData);
  const slide = useRecoilValue(currentSlideData);
  const [isLoading, setIsLoading] = useState(true);

  function nextSlide(e) {
    if (e && index < allSlides.length - 1) {
      setIndex(index + 1);
      if (index < allSlides.length - 2) {
        if (allSlides[index + 1].image) {
          cacheImages([allSlides[index + 1].image.image]);
        }
      }
      if (index === allSlides.length - 2 && allSlides[0].image) {
        cacheImages([allSlides[0].image.image]);
      }
    }
    if (e && index === allSlides.length - 1) {
      setIndex(0);
      if (allSlides[0].image) {
        cacheImages([allSlides[1].image.image]);
      }
    }
  }

  function prevSlide(e) {
    if (e && index > 0) {
      setIndex(index - 1);
    }
    if (e && index === 0) {
      setIndex(allSlides.length - 1);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://raw.githubusercontent.com/nkmwicz/content-presentations/main/cmu-dh-workshop.json"
      );
      const data = await response.json();
      setAllSlides(data.slides);
      await cacheImages(data.images);
      setIsLoading(false);
      setIndex(0);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <QuickLayout
        slide={slide}
        mode="dark"
        nextClick={nextSlide}
        prevClick={prevSlide}
      ></QuickLayout>
    </>
  );
}

export default App;
