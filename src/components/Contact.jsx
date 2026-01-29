import React, { useRef } from 'react'
import { openingHours, socials } from '../../constant'
import { useGSAP } from '@gsap/react'
import gsap, { SplitText } from 'gsap/all'

const Contact = () => {
    const titleRef = useRef()
    const contactContainerRef = useRef()
    useGSAP(()=>{
        const titleSplit = SplitText.create(titleRef.current,{
           type: "words"
        })
        const timeline = gsap.timeline({
            scrollTrigger:{
                trigger: contactContainerRef.current,
                start:'top center',
            },
            ease:'power1.inOut'
        })
        timeline.from(titleSplit.words,{
            opacity:0,
            yPercent:100,
            stagger:0.02
        }).from('#contact h3 #contact p',{
            opacity:0,
            yPercent:100,
            stagger:0.02

        }).to('#f-right-leaf',{
            y:'-50',
            duration:1,
            ease:'power1.inOut'
        }).to('#f-leaf-leaf',{
            y:'-50',
            duration:1,
            ease:'power1.inOut'
        })

    },[])

  return (
   <footer ref={contactContainerRef} id="contact">
    <img src='/images/footer-right-leaf.png' alt='leaf-right' id='f-right-leaf'/>
    <img src='/images/footer-left-leaf.png' alt="leaf-left" id="f-left-leaf"/>
    <div className='content'>
        <h2 ref={titleRef}>Where to Find Us</h2>
        <div>
            <h3>Visit Our Bar</h3>
            <p>456, Raq Blvd. Los Angeles, CA 90210</p>
        </div>
        <div>
            <h3>Contact Us</h3>
            <p>(555) 987-6543</p>
            <p>hello@moctail.com</p>
        </div>
        <div>
            <h3>Open Every Day</h3>
            {openingHours.map((time)=>{
                return <p key={time.day}>
                    {time.day} : {time.time}
                </p>
            })}
        </div>
        <div>
            <h3>Socials</h3>
            <div className='flex-center gap-5'>
                {socials.map((social)=>{
                    <a key={social.name} href={social.url} target='_blank' rel='noopener noreferer' aria-label={social.name}>
                        <img src={social.icon}/>
                    </a>
                })}

            </div>
        </div>

    </div>

   </footer>
  )
}

export default Contact