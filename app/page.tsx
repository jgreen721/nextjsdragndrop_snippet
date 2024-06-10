"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { CiMapPin } from "react-icons/ci";
// import {Montserrat} from "next/font/google"
import {motion} from "framer-motion"

type Destination = {
  id: number,
  name: string,
  location: string,
  img: string,
};



type DestinationItemProps = {
  destination: Destination,
  onDragStart:any,
  onDragOver: any,
  onDrop: any,
  isDragging: boolean
  hoveredItem:boolean
  delay:number
};

const DestinationItem: React.FC<DestinationItemProps> = ({ destination, onDragStart, onDragOver, onDrop, isDragging,hoveredItem,delay }) => {
  const customDragRef = useRef<HTMLDivElement>(null);

  return (
    <motion.li
    initial={{ scaleX: 0 }} animate={{ scaleX:1}} transition={{type:"spring",delay }}
    className="relative">
      <div id="card-content"
           className={`overflow-hidden relative cursor-grab rounded-3xl ${isDragging ? "bg-gray-400" : "bg-gray-300"} flex items-center justify-start gap-5 p-2 my-4 ${hoveredItem && 'border-b-4 border-sky-500'} shadow-md shadow-sky-200`}
           draggable
           onDragStart={(e) => {
            onDragStart(e, destination);
            e.dataTransfer.setData('itemId',JSON.stringify(destination.id));

            if(customDragRef.current) {
              e.dataTransfer.setDragImage(customDragRef.current, 50, 10);
       }
    }
    }
    onDragOver={(e) => onDragOver(e,destination)}
    onDrop={(e) => onDrop(e, destination)}


      >
      <div className="cursor-none pointer-events-none overflow-hidden">
        <Image
          src={destination.img}
          width={100}
          height={100}
          className={`transition ease-in-out ${isDragging ? 'opacity-20' : 'opacity-100'} ${hoveredItem ? 'scale-125' :'scale-100'}`}
          alt="destination"
        />
      </div>
      <div className='relative width-full h'>
        <h5 className="font-bold">{destination.name}</h5>
        <div className="flex items-center justify-start gap-2">
          <CiMapPin className="border-b border-b-black" />
          <p className="opacity-50">{destination.location}</p>
        </div>
      </div>
      <div ref={customDragRef} className={`flex justify-start items-center gap-2 p-2 bg-white rounded w-auto absolute right-0 text-customColor-dark translate-x-[350px]`}>
      <Image
          src={destination.img}
          width={30}
          height={30}
          alt="destination"
        />  
         <h5 className="font-bold">{destination.name}</h5>
      </div>
    </div>
    </motion.li>
  );
};


// const inter = Montserrat({
//   weight:"500",

//   subsets: ['latin'],
//   display: 'swap',
// })

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: 1, name: "Scotland Island", location: "Sydney, Australia", img: "/assets/scotlandislandbeach.png" },
    { id: 2, name: "The Charles Grand Brasserie & Bar", location: "Lorem ipsum, Dolar", img: "/assets/charlesgrand.png" },
    { id: 3, name: "Bridge Climb", location: "Dolan, Sit amet", img: "/assets/bridgeclimbreg.png" },
    { id: 4, name: "Scotland Island", location: "Sydney, Australia", img: "/assets/scotland.png" },
    { id: 5, name: "Clam Bar", location: "Etcetera veni, Vidi vici", img: "/assets/clam.png" },
    { id: 6, name: "Vivid Festival", location: "Sydney, Australia", img: "/assets/vivid.png" },
  ]);


  const [draggingItem, setDraggingItem] = useState<Destination | null>(null);
  const [hoveredItem, setHoveredItem] = useState<Destination | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLElement>, destination: Destination) => {
    setDraggingItem(destination);
 

 
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>,destination:Destination) => {
    // console.log("items been entered!!",event)
    event.preventDefault();
    setHoveredItem(destination)
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>, destination: Destination) => {
    event.preventDefault();
    console.log("ID",destination.id)
    console.log("drag ended!!!",destination.name)
    console.log(event.dataTransfer.getData('itemId'));

    if (draggingItem) {
      let temp = destinations.map((dest)=>dest.id == draggingItem.id ? destination : dest.id == destination.id ? draggingItem : dest);
      setDestinations(temp);
      setDraggingItem(null);
      setHoveredItem(null);
    }
  };

  return (
    <motion.main initial={{ translateY: '-100%' }} animate={{ translateY:"0%" }} transition={{type:"spring" }} className={`min-h-screen border-solid p-4 bg-black`}>
      <header className="text-center relative flex items-center justify-center bg-sky-500 w-full lg:w-1/2 m-auto rounded">
          <h1 className="text-xl text-white z-10">draggable</h1>
          <h1 className="text-2xl text-color-black md:text-5xl uppercase text-white font-bold p-2 relative z-10" style={{textShadow:'1px 1px 1px black'}}> 
          Destinations
          </h1>

      </header>
      <section className="border-white w-full lg:w-1/2 py-7 m-auto">
        <ul id="destination-items">
          {destinations.map(destination => (
            <DestinationItem
              key={destination.id}
              destination={destination}
              hoveredItem={hoveredItem?.id == destination.id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggingItem?.id === destination.id}
              delay={destination.id/3}
            />
          ))}
        </ul>
     
      </section>
      <footer className="text-center">
          <a target="_blank" className="text-sky-500 bg-gray-300 p-1 px-5 rounded" href="https://jgreen721dev.com">JGDev721</a>
      </footer>
    
    </motion.main>
  );
}
