import styled from 'styled-components';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from './CustomArrow';

export default function Carousel() {
  const settings = {
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };
  return (
    <CarouselWrapper>
      <StyledSlider {...settings}>
        <SlideContent>
          <h3>1</h3>
        </SlideContent>
        <SlideContent>
          <h3>2</h3>
        </SlideContent>
        <SlideContent>
          <h3>3</h3>
        </SlideContent>
      </StyledSlider>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.section`
  border-radius: 5px;
  width: 100%;
  height: 24.9rem;
  background-color: gray;
`;

const StyledSlider = styled(Slider)`
  .slick-slider {
    height: 100%;
    position: relative;
    border-radius: 5px;
  }

  .slick-list {
    height: 100%;
    border-radius: 5px;
  }

  .slick-track {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .slick-slide {
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .slick-arrow {
    width: 4rem;
    height: 4rem;
    position: absolute;
  }

  .slick-prev {
    border-radius: 100%;

    position: absolute;
    top: 21rem;
    right: 10rem;
    left: auto !important;
    z-index: 100;
  }

  .slick-next {
    border-radius: 100%;

    position: absolute;
    top: 21rem;
    right: 4rem;

    z-index: 100;
  }

  .slick-prev::before,
  .slick-next::before {
    display: none;
  }

  .slick-prev:focus,
  .slick-next:focus {
    color: white;
  }
`;

const SlideContent = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
