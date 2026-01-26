import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
    onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // Sequence:
            // 1. Text slides up
            // 2. Text fades out
            // 3. Notify Complete - Parent handles removal/reveal

            tl.to(".intro-text img", {
                y: 0,
                duration: 1,
                ease: "expo.out"
            })
                .to(textRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.5
                });

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-navy flex items-center justify-center text-white pointer-events-none"
        >
            <div
                ref={textRef}
                className="intro-text flex items-center justify-center overflow-hidden"
            >
                <img
                    src="/assets/logo-bosques.png"
                    alt="BOSQUES CALIFORNIA"
                    className="h-24 md:h-32 w-auto object-contain translate-y-full"
                />
            </div>
        </div>
    );
};

export default IntroOverlay;
