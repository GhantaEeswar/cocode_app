import React, { useRef } from 'react';
import SliderItem from './SliderItem';
import ThumbnailItem from './ThumbnailItem';
import './Slider.css';


// const timeRunning = 3000;
// const timeAutoNext = 10000;

const Slider = () => {
 // const [currentIndex, setCurrentIndex] = useState(0);
  //const [runNextAuto, setRunNextAuto] = useState(null);

  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);
  //const timeRef = useRef(null);
  const nextRef = useRef(null);

  // useEffect(() => {
  //   const items = sliderRef.current.querySelectorAll('.item');
  //   const thumbnailItems = thumbnailRef.current.querySelectorAll('.item');

  //   thumbnailRef.current.appendChild(thumbnailItems[2]);

  //   // const runTimeOut = setTimeout(() => {
  //   //   nextRef.current.click();
  //   // }, timeAutoNext);

  //   // return () => {
  //   //   clearTimeout(timeRef.current);
  //   //   clearTimeout(runTimeOut);
  //   // };
  // }, []);

  const showSlider = (type) => {
    const items = sliderRef.current.querySelectorAll('.item');
    const thumbnailItems = thumbnailRef.current.querySelectorAll('.item');

    if (type === 'next') {
      sliderRef.current.appendChild(items[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      sliderRef.current.classList.add('next');
    } else {
      sliderRef.current.prepend(items[items.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      sliderRef.current.classList.add('prev');
    }

    // clearTimeout(timeRef.current);
    // timeRef.current = setTimeout(() => {
    //   sliderRef.current.classList.remove('next');
    //   sliderRef.current.classList.remove('prev');
    // }, timeRunning);

    // clearTimeout(runNextAuto);
    // setRunNextAuto(setTimeout(() => {
    //   nextRef.current.click();
    // }, timeAutoNext));
  };

  return (
    <div className="carousel" id="about">
      <div className="list" ref={sliderRef}>
        <SliderItem
          image="/image/img1.jpeg"
          author="CO-CODE"
          title="CODE WITH"
          topic="FRIENDS"
          description="Open a Co-Code editor, write or copy code, then share it with friends and colleagues. Pair program and troubleshoot together.."
          
        />
        <SliderItem
          image="/image/img2.jpeg"
          author="CO-CODE"
          title="TEACH PEOPLE"
          topic="TO CODE"
          description="Share your code with students and peers then educate them. Universities and colleges around the world use Co-Code every day."
          
        />
        <SliderItem
          image="/image/img3.jpeg"
          author="CO-CODE"
          title="INTERVIEW"
          topic="DEVELOPERS"
          description="Set coding tasks and observe in real-time when interviewing remotely or in person. Nobody likes writing code on a whiteboard."
        />
        
      </div>
      <div className="thumbnail" ref={thumbnailRef}>
        <ThumbnailItem
          image="/image/img1.jpeg"
          title="Code with Friends"
          description="Slide-1"
          
        />
        <ThumbnailItem
          image="/image/img2.jpeg"
          title="Teach Coding"
          description="Slide-2"
       
        />
        <ThumbnailItem
          image="/image/img3.jpeg"
          title="Interview Developers"
          description="Slide-3"
         
        />
      </div>
      <div className="arrows">
        <button id="prev" ref={nextRef} onClick={() => showSlider('prev')}>
          &lt;
        </button>
        <button id="next" ref={nextRef} onClick={() => showSlider('next')}>
          &gt;
        </button>
      </div>
      <div className="time" />
    </div>
  );
};

export default Slider;