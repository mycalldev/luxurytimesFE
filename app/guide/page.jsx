import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './BuyingRolex.module.css'

export default function BuyingRolex() {
  return (
    <div>
        {/* HERO SECTION */}
        <div className={styles.imageHeroContainer}>
          <Image src={'/guide_hero_cropped1.jpg'} width={1680} height={902} className={styles.imageHero} alt='guide hero image' quality={100} />
        </div>

        <Link href={'/'} className={styles.backLinkBTN}>
          <div className={styles.backNav}>
              {'< Home'}
          </div>
        </Link> 

        <div className={styles.tagTitle}>
            <h1 className={styles.titleMain}>What to Know When Buying a Rolex</h1>
            <h4 className={styles.titleSub}>Chronological Masterpiece</h4>
        </div>

        <div className={styles.intro}>
        The most important factor when deciding to buy a Rolex model is not necessarily the price or whether you are getting a bargain. This may be true if your sole intention is to buy for investment only. Otherwise, there are several key factors to consider….

        </div>

        <div className={styles.intro}>
        There are a myriad of Rolex models, all of which comprise different functional components and more obvious to the naked eye, the design features. However, for now we shall focus on the most important factor when making the purchase.... 
        </div>
        
        <div className={styles.titleSub}>The Fitting of the Rolex</div>

        <div className={styles.wrist}>
          <Image src={'/wrist.JPG'} width={3360} height={2240} className={styles.imageWrist} alt='image of watch on wrist' quality={100} />
        </div>

        <div className={styles.intro}>
        Humans all have different size wrists. And to accompany the circumference of our wrist, we have a unique wrist to hand ratio. Meaning, someone with a small wrist may have a large hand. The opposite may be true and quite often anywhere in between. This is an important factor because Rolex models (depending on the year of manufacturing) vary in the diameter of their Dials. 
        As an example, a 30 year old Datejust Midi model can comprise a 31mm dial compared to a more recent Sky Dweller model with a 42mm dial.
        </div>

        <div className={styles.intro}>
        It&apos;s pertinent to note that in the older versions of Rolex models you needed to remove the bracelet links if you wanted to adjust the size to accommodate a smaller wrist. Times have moved on and Rolex first introduced a Glide Lock Clasp feature in 2008 to allow for a fitted timepiece without the requirement of missing links. Therefore, if you are purchasing a newer model Rolex, ensure that there are no missing links. 
        </div>

        <div className={styles.braceletJubilee}>
          <Image src={'/bracelet_jubilee.jpeg'} width={1086} height={724} className={styles.imageBracelet} alt='image of a Rolex jubilee bracelet' quality={100} />
        </div>

        <div className={styles.intro}>
        To summarise on the fitting of the bracelet and the size of the dial, it goes without saying that the larger the dial, the heavier the watch. Make sure the watch feels comfortable on the wrist in terms of weight, size of dial and fitting of the wrist bracelet.
        </div>

        <div className={styles.titleSub}>The Fun Stuff</div>

        <div className={styles.batmanGold}>
          <Image src={'/batman_gold.JPG'} width={3360} height={2240} className={styles.imageBatmanGold} alt='image of Rolex Batman and Gold' quality={100} />
        </div>



        <div className={styles.intro}>
        With the most important factor covered we shall now move on to the fun stuff….
        In most recent times, Rolex have focused their efforts on the Bezel. Rolex now comprise their very own &apos;in house&apos; material called Cerachrom to manufacture the bezel. Cerachrom is unique to the watch market and carries many advantages. 
        On face value you may notice an array of differing colours accompanied with a particular Rolex model&apos;s Bezel. Colour is a great way to catch the eye of a passer by or indeed, exude vibrance. Rolex recognised this attribute as fundamental to their brand and have implemented a multitude of models to follow suit with their attention grabbing marketing plan.

        </div>

        <div className={styles.intro}>
        It is true to say that Rolex has kept pace with the changing times and can be considered innovators in the horological sector.
        </div>

        <div className={styles.intro}>
        Having mentioned the array of colours, choose the colour that best suits your personality or requirements…. Of Course you would, there are so many to choose from.
        </div>

        <div className={styles.intro}>
        In Addition to the colour variety, Rolex have added functional use cases to the bezel. For instance, the Submariner model&apos;s bezel is unidirectional. Meaning that the bezel can only be rotated in 1 direction (anti-clockwise). This is a diver’s watch and the reason for the single anti-clockwise rotation is a safety mechanism built in to protect the diver. I find this to be very intuitive on behalf of Rolex and offers an insight into their attention to detail. Additionally, other Rolex models such as the GMT-Master II  comprise a bi-directinal bezel, rotating in both anti-clockwise and clockwise. Again, there is a good reason for this…. 
        </div>

        <div className={styles.quote}>
        Everything happens for a reason in the &apos;World of Rolex&apos;
        </div>

        <div className={styles.intro}>
        The Rolex dial on particular models also boasts an array of differing colours. In fact, Rolex seems to have the most fun with their dial designs. There is also the bracelet to consider. Rolex takes advantage of several materials to build out and complement each model. And these materials are of high value:
        </div>

        <ul className={styles.listItem}>
            <li>18k Yellow Gold</li>
            <li>18k Rose Gold</li>
            <li>18k White Gold</li>
            <li>Bespoke Oyster Steel</li> 
        </ul>

        <div className={styles.intro}>
        On each or most Rolex models, you can find a design of 2 materials that complete the bracelet. I.e. Rose Gold and Oyster Steel.
        </div>

        
        <div className={styles.watchesGold}>
        <Image src={'/tri_watches_gold.JPG'} width={3360} height={2240} className={styles.imageWatchGold} alt='image of watch and gold' quality={100} />
        </div>

        <div className={styles.intro}>
        To summarise, I think it would be fair to give praise to Rolex for their engineering. They are truly the masters of their world. The automatic movement (72 hour power reserve) and all the intricate mechanical details such as the ParaChrom Hairspring, Chronergy Escapement, Paraflex shock absorber that cohesively amalgamate to deliver a concept of time keeping that Rolex make look easy….
        </div>

        <div className={styles.intro}>
          Luxury Times Ltd is available by appointment only. 
        </div>

    
    <div className={styles.contactBTNContainer}>
        <Image src={"/call.png"} width={25} height={25} alt={'phone icon'} quality={100} /> 
        <Link href="tel:07714611699" className={styles.linkBTN}>Contact</Link>
    </div>
    {/* CTA  */}
    <div className={styles.contactBTN}>
      <Link href="tel:07714611699" className={styles.linkBTN}>CONTACT</Link>
    </div>
      <div className={styles.contactBTNDesktop}>
        <h3 className={styles.contactReview}>CONTACT</h3>
        <div>07714 611 699</div>
      </div>
    </div>
    
  )
}
