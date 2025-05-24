import React from 'react';

type BaseCardProps = {
    title: string;  
    image: string;
    children: React.ReactNode;
};
export default function BaseCard({ children, title, image }: BaseCardProps) {
    return (
        <div className="flex flex-col items-center justify-center p-2 border-2 border-purple-300 w-80 rounded-lg shadow-lg my-2 mx-auto">
           <div className="flex flex-col items-center justify-center rounded-t-md w-full max-h-36 overflow-hidden">
               <img src={image} alt={title} className="w-full h-28 object-cover rounded-t-md" />
               <h2 className="font-semibold text-white mt-2 text-2xl">{title}</h2>
           </div>
            <hr className="p-0.5 bg-slate-50 w-full my-2"/>
           <div className="w-full">
                {children}
           </div>          
        </div>
    );
}