import { atom, selector } from "recoil";

export const allSlidesData = atom({
  key: "allSlidesData",
  default: [],
});

export const slideIndexData = atom({
  key: "slideIndexData",
  default: 0,
});

export const currentSlideData = selector({
  key: "currentSlideData",
  get: ({ get }) => {
    const allSlides = get(allSlidesData);
    const index = get(slideIndexData);
    return allSlides[index];
  },
});
