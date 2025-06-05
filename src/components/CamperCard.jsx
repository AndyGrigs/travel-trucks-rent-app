import { Link } from 'react-router-dom';

const featureIcons = {
  AC: '❄️',
  Automatic: '⚙️',
  Kitchen: '🍳',
  TV: '📺',
  Bathroom: '🚿',
  Petrol: '⛽',
};

const CamperCard = ({ camper }) => {
  const features = [
    camper.AC && 'AC',
    camper.automatic && 'Automatic',
    camper.kitchen && 'Kitchen',
    camper.TV && 'TV',
    camper.bathroom && 'Bathroom',
    camper.petrol && 'Petrol',
  ].filter(Boolean);
  return (
    <div>
      <img
        src={camper.gallery?.[0]?.original || '/images/placeholder.jpg'}
        alt={camper.name}
        className="w-full md:w-[290px] h-[230px] object-cover rounded-lg flex-shrink-0 mb-4 md:mb-0"
      />
      <h3 className="text-xl font-bold text-gray-900">{camper.name}</h3>
      <span className="text-2xl font-bold text-gray-900">
        €{Number(camper.price).toLocaleString('de-DE')}.00
      </span>

      <span className="mr-2">📍</span>
      <span>{camper.location}</span>
       <p className="text-gray-500 text-sm mb-4 line-clamp-2">{camper.description}</p>
        {features.map((feature) => (
               <span
                 key={feature}
                 className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
               >
                 {featureIcons[feature] && <span className="mr-1">{featureIcons[feature]}</span>}
                 {feature}
               </span>
             ))}

             <Link
             to={`/catalog/${camper.id}`}
             className="self-start text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition"
           >
             Show more
           </Link>
    </div>
  )
  //   return (
  //     <div className="flex flex-col md:flex-row bg-white shadow rounded-xl p-6 mb-6 gap-6 items-start border border-gray-200 max-w-full h-full">
  //       <img
  //         src={camper.gallery?.[0]?.original || '/images/placeholder.jpg'}
  //         alt={camper.name}
  //         className="w-full md:w-[290px] h-[230px] object-cover rounded-lg flex-shrink-0 mb-4 md:mb-0"
  //       />
  //       <div className="flex flex-col flex-1 min-w-0">
  //         <div className="">
  //   <h3 className="text-xl font-bold text-gray-900">{camper.name}</h3>
  //           <span className="text-2xl font-bold text-gray-900">
  //             €{Number(camper.price).toLocaleString('de-DE')}.00
  //           </span>
  //         </div>
  //         <div className="flex items-center text-gray-500 text-sm mb-2">
  //           <span className="mr-2">📍</span>
  //           <span>{camper.location}</span>
  //         </div>
  //         <p className="text-gray-500 text-sm mb-4 line-clamp-2">{camper.description}</p>
  //         <div className="flex flex-wrap gap-2 mb-4">
  //           {features.map((feature) => (
  //             <span
  //               key={feature}
  //               className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
  //             >
  //               {featureIcons[feature] && <span className="mr-1">{featureIcons[feature]}</span>}
  //               {feature}
  //             </span>
  //           ))}
  //         </div>
  //         <Link
  //           to={`/catalog/${camper.id}`}
  //           className="self-start text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition"
  //         >
  //           Show more
  //         </Link>
  //       </div>
  //     </div>
  //   );
};

export default CamperCard;