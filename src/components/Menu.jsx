import { useRef, useState } from "react";
import { sliderLists } from "../../constant"
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

const Menu = () => {
    const [currentIndex,setCurrentIndex] = useState(0)
    const totalCocktails = sliderLists.length;
    const currentCocktail = sliderLists[currentIndex]
    const previousCocktailName = sliderLists[currentIndex -1 ]?.name || sliderLists[sliderLists.length - 1]?.name
    const nextCocktailName = sliderLists[currentIndex +1 ]?.name || sliderLists[0]?.name
    const contentRef = useRef()
    const menuRef = useRef()
    const leftLeafRef = useRef()
    const rightLeafRef = useRef()
    const goToSlide = (index)=>{
        const newIndex = (index + totalCocktails)% totalCocktails
        setCurrentIndex(newIndex)
    }
    useGSAP(()=>{
        const leafTimeline = gsap.timeline({
            scrollTrigger:{
                trigger: menuRef.current,
                start:'top 80%',
                end:'bottom top',
                scrub:true

            }
        })
        leafTimeline.fromTo(leftLeafRef.current,{
        
                yPercent: 0,
                rotateZ: 0,
                transformOrigin: "left center",
              },
              {
                yPercent: -100,
                rotateZ: 25, 
                ease: "power2.out",
              }).fromTo(rightLeafRef.current,{
                yPercent: 0,
                transformOrigin: "right center",
              },
              {
                yPercent: 100,
                ease: "power2.out",

              },"<")
        gsap.fromTo('#title',{
            opacity:0

        },{
            opacity:1,
            duration:1
        })
        gsap.fromTo('.cocktail img',{
            opacity:0,
            xPercent:-100
        },{
            opacity:1,
            xPercent:0,
            duration:1,
            ease:'power1.inOut'
        })
        gsap.fromTo('.details h2',{
            yPercent:100,
            opacity:0
        },{
            yPercent:0,
            opacity:100,
            ease:'power1.inOut'
        })
        gsap.fromTo('.details p',{
            yPercent:100,
            opacity:0
        },{
            yPercent:0,
            opacity:100,
            ease:'power1.inOut'
        })

    },[currentIndex])
  return (
    <section id="menu" ref={menuRef} className="px-8 md:px-12" aria-labelledby="menu-heading" >
        <img ref={leftLeafRef} src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf"/>
        <img ref={rightLeafRef} src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf"/>
        <h2 className="sr-only" id="menu-heading">
            Cocktail Menu
        </h2>
        <nav className="cocktail-tabs" aria-label="Cocktail Navigation" >
            {sliderLists.map((cocktail,index)=>{
                const isActive = index === currentIndex;

                return (<button key={cocktail.id} className={`${isActive? 'text-white border-white':'text-white/50 border-white/50'}`}
                onClick={()=>goToSlide(index)}>
                    {cocktail.name}
                </button>)
            })}

        </nav>
        <div className="content">
            <div className="arrows">
                <button className="text-left" onClick={()=>goToSlide(currentIndex -1)}>
                    <span>{previousCocktailName}</span>
                    <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden={true}/>
                </button>
                <button className="text-right" onClick={()=>goToSlide(currentIndex +1)}>
                    <span>{nextCocktailName}</span>
                    <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden={true}/>
                </button>

            </div>
            <div className="cocktail">
                <img src={currentCocktail.image} className="object-contain"/>
            </div>
            <div className="recipe">
                <div ref={contentRef} className="info">
                    <p>Recipe for:</p>
                    <p id="title">{currentCocktail.name}</p>

                </div>
                <div className="details">
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Menu