import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NetflixCard from './NetflixCard';
import './NetflixRow.css';

export default function NetflixRow({ title, data }) {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="netflix-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <ChevronLeft 
          className={`row-nav left ${!isMoved && 'hidden'}`} 
          onClick={() => handleClick('left')}
        />
        <div className="row-posters" ref={rowRef}>
          {data.map((item, index) => (
            <NetflixCard key={item.id || index} item={item} />
          ))}
        </div>
        <ChevronRight 
          className="row-nav right" 
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}
