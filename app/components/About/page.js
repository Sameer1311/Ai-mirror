"use client";
import gsap from "gsap";
import { useEffect, useRef, forwardRef, Suspense } from "react";
import { ScrollIcon } from "lucide-react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Model Component
const Bee = forwardRef((props, ref) => {
    const gltf = useLoader(GLTFLoader, "/models/Robot.glb");
    const mixerRef = useRef(null);

    useEffect(() => {
        if (gltf.animations.length > 0) {
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[0]);
            action.play();
        }
    }, [gltf]);

    useFrame((_, delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
    });

    return <primitive ref={ref} object={gltf.scene} scale={1.8} position={[0, -0.5, 0]} />;
});

Bee.displayName = "Bee";

const About = () => {
    const hero1Ref = useRef(null);
    const hero2Ref = useRef(null);
    const beeRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            hero1Ref.current,
            { x: "-100%", opacity: 0 },
            { x: "0%", opacity: 1, delay: 0.3, duration: 1, ease: "power2.out" }
        );

        gsap.fromTo(
            hero2Ref.current,
            { x: "100%", opacity: 0 },
            { x: "0%", opacity: 1, delay: 0.5, duration: 1, ease: "power2.out" }
        );
    }, []);

    return (
        <div className="relative w-screen h-full overflow-hidden flex flex-col items-center justify-center text-gray-900 dark:text-gray-100">
            {/* 3D Scene */}
            <div className="w-full h-[250px] md:h-[300px] cursor-pointer lg:h-[380px] flex justify-center items-center">
                <Canvas camera={{ position: [0, 2, 5] }}>
                    <directionalLight intensity={1} />
                    <ambientLight intensity={0.5} position={[2, 2, 2]} />
                    <OrbitControls/>
                    <Suspense fallback={null}>
                        <Bee ref={beeRef} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row w-full space-x-5 px-6 md:px-10 lg:px-12 space-y-8 md:space-y-0 text-center md:text-left">
                {/* AI-Powered Assistance */}
                <div ref={hero1Ref} className="flex-1 p-6 -lg text-canter transform transition hover:scale-105">
                    <h2 className="text-2xl text-center md:text-3xl font-bold text-blue-500 dark:text-blue-400">AI-Powered Assistance</h2>
                    <p className="mt-3 text-gray-700 text-center dark:text-gray-300">
                        Our AI-driven platform provides intelligent support tailored to your needs. Get instant answers,
                        personalized recommendations, and seamless assistance in tracking <b className="text-blue-500 font-bold">News</b>, <b className="text-blue-500">Markets</b>, and <b className="text-blue-500">Weather</b> conditions.
                    </p>
                </div>

                {/* Smart & Real-Time Updates */}
                <div ref={hero2Ref} className="flex-1 p-6 -lg text-center  transform transition hover:scale-105">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-400">Smart & Real-Time Updates</h2>
                    <p className="mt-3 text-gray-700 text-center dark:text-gray-300">
                        Stay ahead with live updates on <span className="font-bold text-blue-500">news</span>,
                        <span className="font-bold text-blue-500"> crypto prices</span>,
                        <span className="font-bold text-blue-500"> weather forecasts</span>, and
                        <span className="font-bold text-blue-500"> currency conversions</span>. AI Mirror keeps you
                        informed, anytime, anywhere.
                    </p>
                </div>
            </div>

            {/* Scroll Prompt */}
            
        </div>
    );
};

export default About;
