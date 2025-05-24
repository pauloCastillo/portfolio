import { useState, useEffect, useRef } from "react";

interface SlidesProps {
    slides: string[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
}

export default function Slider({ 
    slides, autoSlide = true,
    autoSlideInterval = 3000, 
}: SlidesProps) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        
        if (!autoSlide) return;

        slideIntervalRef.current = setInterval(nextSlide, autoSlideInterval);
        return () => {
            if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
        };
    }, [currentIndex, autoSlide, autoSlideInterval]);

    
    if (slides.length === 0) {
        return <div>No slides available</div>;
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? slides.length - 1 : prevIndex - 1);
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === slides.length - 1 ? 0 : prevIndex + 1);
    }
    
    // Pausar cuando el mouse esté sobre el slider
    const pauseAutoSlide = () => {
        if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };

    const resumeAutoSlide = () => {
        if (autoSlide) {
        slideIntervalRef.current = setInterval(nextSlide, autoSlideInterval);
        }
    };

    return(
        <div className="relative w-full h-full overflow-hidden rounded-lg" onMouseEnter={pauseAutoSlide}
        onMouseLeave={resumeAutoSlide}>
            <div className="w-full h-full flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides?.map((slide, index) => (
                    <img
                        key={index}
                        src={slide}
                        alt={`Slide-${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 z-10"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 z-10"
            >
                &#10095;
            </button>
                {/* Indicadores */}
            <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                {slides.map((_, idx) => (
                <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-3 h-3 rounded-full cursor-pointer focus:outline-none z-10 ${
                    idx === currentIndex ? "bg-white" : "bg-white/50"}`}
                    onClick={() => setCurrentIndex(idx)}
                    tabIndex={0}
                />
                ))}
            </div>
        </div>
    )
}