import React, { useRef } from 'react'
import { cocktailLists, mockTailLists } from '../../constant'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/all'

const Cocktails = () => {
    const cocktailSecRef = useRef()
    const leftLeafRef = useRef()
    const rightLeafRef = useRef()
    useGSAP(()=>{
        const parallexTimeline = gsap.timeline({
            scrollTrigger:{
                trigger:cocktailSecRef.current,
                start:'top 30%',
                end:'bottom 80%',
                scrub:true

            }
        })
        parallexTimeline.from(leftLeafRef.current,{
            x:-100,
            y:100
        }
        ).from(rightLeafRef.current,{
            x:100,
            y:100
        }
        )

    },[])

  return (
    <section ref={cocktailSecRef} id='cocktails' className='mb-40 px-8 md:px-12'>
        <div className="noisy pointer-events-none z-0"/>

        <img ref={leftLeafRef} src='/images/cocktail-left-leaf.png' alt='l-leaf' id='c-left-leaf'/>
        <img ref={rightLeafRef} src='/images/cocktail-right-leaf.png' alt='r-leaf' id='c-right-leaf'/>

        <div className='list'>
            <div className='popular'>
                <h2>Most popular cocktails:</h2>
                <ul>
                    {cocktailLists.map(({name,country,detail,price})=>{
                        return (<li key={name}>
                            <div className='md:me-28'>
                                <h3>{name}</h3>
                                <p>{country} | {detail}</p>
                            </div>
                            <span>- {price}</span>
                        </li>)
                    })}

                </ul>

            </div>
            <div className='loved'>
                <h2>Most loved cocktails:</h2>
                <ul>
                    {mockTailLists.map(({name,country,detail,price})=>{
                        return <li key={name}>
                            <div className='me-28'>
                                <h3>{name}</h3>
                                <p>{country} | {detail}</p>
                            </div>
                            <span>- {price}</span>
                        </li>
                    })}

                </ul>

            </div>

        </div>
    </section>
  )
}

export default Cocktails