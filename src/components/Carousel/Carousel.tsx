import React, { useEffect, useRef } from 'react';
import './Carousel.scss';
import ArrowLeft from '../../assets/Arrow Left.svg';
import ArrowRight from '../../assets/Arrow Right.svg';
import Dot from '../../assets/_Dot indictaor.svg';
import ActiveDot from '../../assets/ActiveDot.svg';
import product1 from '../../assets/product1.png';
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';
import product4 from '../../assets/product4.png';
import product5 from '../../assets/product5.png';

interface ProductItem {
  imgSrc: string;
  text: string;
}

const productItems: ProductItem[] = [
  { imgSrc: product1, text: 'Kitchen utensils' },
  { imgSrc: product2, text: 'Cones' },
  { imgSrc: product3, text: 'Flower' },
  { imgSrc: product4, text: 'Circle' },
  { imgSrc: product5, text: 'Flower Pot' },
];

function Carousel() {
  const sliding = useRef<boolean>(true);
  const moving = useRef<boolean>(false);
  const userActionTimeout = useRef<number | null>(null);

  const startInfiniteLoop = () => {
    userActionTimeout.current = setTimeout(() => {
      sliding.current = true;
      shiftRightInfinite();
    }, 10000); // wait before starting infinite loop after user actions are finished
  };

    //maintianing the infinite loop
    const shiftRightInfinite = async () => {
      while (sliding.current) {
        await shiftRight();
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };
  
    useEffect(() => {
      shiftRightInfinite(); 
    }, []); 
  
  //action when user clicks on the left arrow
  const handleShiftLeft = async () => {
    if(moving.current) {
      return
    }
    sliding.current = false;
    clearTimeout(userActionTimeout.current || 0);
    userActionTimeout.current = null;
    await shiftLeft();
    startInfiniteLoop();
  }

  //action when user clicks on the right arrow
  const handleShiftRight = async () => {
    if(moving.current) {
      return
    }
    sliding.current = false;
    clearTimeout(userActionTimeout.current || 0);
    userActionTimeout.current = null;
    await shiftRight();
    startInfiniteLoop();
  }

  //shifting the card from left to right
  const shiftLeft = async () => {
    moving.current = true
    return new Promise<void>((resolve) => {
      const boxes = document.querySelectorAll(".box");
      setTimeout(function () {
        document.querySelector(".cards__container")?.appendChild(boxes[0]);
        moving.current = false
        resolve();
      }, 500);
    });
  };
  
  //shifting the card from right to left
  const shiftRight = async () => {
    moving.current = false
    return new Promise<void>((resolve) => {
      const boxes = document.querySelectorAll(".box");
      setTimeout(function () {
        const parentObj = document.querySelector(".cards__container");
        parentObj?.insertBefore(boxes[4], parentObj.firstChild);
        moving.current = false
        resolve();
      }, 500);
    });
  };

  
  // based on the dot click move the card to center
  const moveToCenter = async (index:number) => {
    if(moving.current) {
      return
    }
    sliding.current = false;
    clearTimeout(userActionTimeout.current || 0);
    userActionTimeout.current = null;
    let currIndex = index;
    const mid = 3;
    if (index === 3) {
      return; // User clicked the center card only
    }
    if (index < 3) {
      // Move left card to center (do right)
      while (currIndex < mid) {
        await shiftRight(); // Await the completion of shiftRight
        currIndex++;
      }
    } else {
      // Move right card to center (do left)
      while (currIndex > mid) {
        await shiftLeft(); // Await the completion of shiftLeft
        currIndex--;
      }
    }
    startInfiniteLoop();
  };
  

  return (
    <div className='carousel-parent'>
        <div className='carousel-head'>
            <div className='heading'>Featured Products</div>
            <div className='desc'>Explore and discover a variety of products</div>
        </div>

    <div className="container">
      <div className="cards-wrapper">
        <ul className="cards__container">
          {
            productItems.map((product,index) => (
              <li className="box" onClick={() => moveToCenter(index + 1)}>
              <img src={product.imgSrc} alt={`product ${index + 1}`} className="box-image"/>
              <span className='box-text'>{product.text}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
    <div className='carousel-move-buttons'>
    <div className="carousel-arr-btn pointer" onClick={handleShiftLeft}>
        <img src={ArrowLeft} alt="" />
      </div>
        {
            [1,2,3,4,5].map((index)=>{
                return (
                    <div key={index} className='pointer' onClick={()=>moveToCenter(index)}><img src={index === 3 ? ActiveDot : Dot} /></div>
                        
                )
            })
        }
      <div className="carousel-arr-btn pointer"  onClick={handleShiftRight}>
        <img src={ArrowRight} alt="" />
      </div>
    </div>
    </div>
  );
}

export default Carousel;
