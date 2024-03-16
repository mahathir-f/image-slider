const initSlider = () => {
  const slideButtons = document.querySelectorAll(".slider-wrapper .icon");
  const sliderScrollBar = document.querySelector(".container .slider-bar");
  const  scrollBarThumb = document.querySelector(".scrollbar-thumb");
  
  const imgList = document.querySelector(".slider-wrapper .image-list");
  scrollBarThumb.addEventListener("mousedown",(e) =>{
    const startX = e.clientX;
    const thumbPosition = scrollBarThumb.offsetLeft;
    const handleMouseMove = (e) => {
        const deltX = e.clientX - startX ;
        const newThumbPosition = thumbPosition + deltX;
        const maxThumdPosition = sliderScrollBar.getBoundingClientRect().width - scrollBarThumb.offsetWidth

        const boundPosition = Math.max(0, Math.min(maxThumdPosition,newThumbPosition));
        const scrollPosition = (boundPosition /  maxThumdPosition) * maxScrollLeft ;

        scrollBarThumb.style.left = `${boundPosition}px`;
        imgList.scrollLeft = scrollPosition;
    }
     const  handleMouseUp = () =>{
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
     }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  })

    const  maxScrollLeft     =  imgList.scrollWidth - imgList.clientWidth;

  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "back-arrow" ? -1 : 1;
      const scrollAmount = imgList.clientWidth * direction;
      imgList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });


  const handleslideButton = () => {
    slideButtons[0].style.display = imgList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display = imgList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };
  const updatescrollThumPosition = () =>{
    const scrollPosition = imgList.scrollLeft;
    const thumbPosition = (scrollPosition /  maxScrollLeft ) * (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);
    scrollBarThumb.style.left = `${thumbPosition}px`;
  }


  imgList.addEventListener("scroll", () => {
    handleslideButton();
    updatescrollThumPosition()
  });
};

window.addEventListener("load", initSlider);
