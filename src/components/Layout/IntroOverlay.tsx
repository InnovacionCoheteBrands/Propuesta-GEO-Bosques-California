import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
    onComplete?: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Call optional external callback
                    if (onComplete) onComplete();
                    // Self-remove from DOM by updating internal state
                    setIsVisible(false);
                }
            });

            // Sequence:
            // 1. Text slides up
            // 2. Text fades out
            // 3. Container fades out
            // 4. Remove from DOM

            tl.to(".intro-text img", {
                y: 0,
                duration: 1,
                ease: "expo.out"
            })
                .to(textRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.5
                })
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5
                });

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    // Don't render if animation is complete
    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-forest flex items-center justify-center text-white pointer-events-none"
        >
            <div
                ref={textRef}
                className="intro-text flex items-center justify-center overflow-hidden"
            >
                <img
                    src="/assets/logo-bosques.png"
                    alt="BOSQUES CALIFORNIA"
                    className="h-24 md:h-32 w-auto object-contain translate-y-full grayscale invert contrast-200 mix-blend-screen"
                />
            </div>
        </div>
    );
};

export default IntroOverlay;


