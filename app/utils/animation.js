"use client";
import gsap from "gsap";

export const animationPageIn = () => {
    const bannerOne = document.getElementById("banner1");
    const bannerTwo = document.getElementById("banner2");
    const bannerThree = document.getElementById("banner3");
    const bannerFour = document.getElementById("banner4");

    if (bannerOne && bannerTwo && bannerThree && bannerFour) {
        const tl = gsap.timeline();
        tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
            yPercent: 0,
        }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
            yPercent: 100,
            stagger: 0.2,
        });
    }
};

export const animatePageOut = (href, router) => {
    if (!href) {
        console.error("🚨 Error: `href` is undefined in animatePageOut.");
        return;
    }

    const bannerOne = document.getElementById("banner1");
    const bannerTwo = document.getElementById("banner2");
    const bannerThree = document.getElementById("banner3");
    const bannerFour = document.getElementById("banner4");
    

    if (bannerOne && bannerTwo && bannerThree && bannerFour) {
        const tl = gsap.timeline();
        tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
            yPercent: -100,
        }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
            yPercent: 0,
            stagger: 0.2,
            onComplete: () => {
                if (typeof href === "string" && href.startsWith("/")) {
                    router.push(href);
                } else {
                    console.error("🚨 Invalid href:", href);
                }
            },
        });
    }
};
