import React, {useEffect, useRef} from "react"
import styles from './Slideshow.module.css'

const Slideshow  = () => {
    const img = [
        '310412743.webp',
        '332305706.webp',
        '2.webp',
        '1748531659.webp',
        '310412743.webp',
    ]
    const containerRef = useRef(null);
    const slideCount = img.length;
    let currentIndex = useRef(0)
    
    useEffect(() => {
        const container = containerRef.current;
        const interval = setInterval(() => {
            const slideWidth = container.offsetWidth;
            currentIndex.current = (currentIndex.current + 1) % slideCount;
            container.scrollTo({
                left: currentIndex.current * slideWidth,
                behavior: currentIndex.current === 0 ? 'auto' : 'smooth',
            });
            }, 3000);
    
        return () => clearInterval(interval);
      }, [slideCount]);
      
    return (
        <div ref={containerRef} className={styles['container']}>
            {img.map((image, index) => (
            <div key={index} className={styles['slide']}>
                <img src={image} alt={`Slide ${index + 1}`} />
            </div>
            ))}
           
        </div>
    )
}

export default Slideshow