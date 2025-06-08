import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ACSvg from "../shared/ACSvg";
import AutomaticSvg from "../shared/AutomaticSvg";
import KitchenSvg from "../shared/KitchenSvg";
import TVSvg from "../shared/TVSvg";
import BathroomSvg from "../shared/BathroomSvg";
import PetrolSvg from "../shared/PetrolSvg";
import Loader from "../shared/Loader";
import StarSvg from "../shared/StarSvg";
import LocationSvg from "../shared/LocationSvg";

const featureIcons = {
  AC: <ACSvg />,
  automatic: <AutomaticSvg />,
  kitchen: <KitchenSvg />,
  TV: <TVSvg />,
  bathroom: <BathroomSvg />,
  petrol: <PetrolSvg />,
};

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        const res = await axios.get(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
        );
        setCamper(res.data);
      } catch (err) {
        console.error("Error fetching camper:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  if (loading) return <Loader />;

  if (!camper)
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-main mb-4">Camper not found.</h1>
      </div>
    );

  const features = [
    camper.AC && { key: "AC", label: "AC", icon: featureIcons.AC },
    camper.automatic && {
      key: "automatic",
      label: "Automatic",
      icon: featureIcons.automatic,
    },
    camper.kitchen && {
      key: "kitchen",
      label: "Kitchen",
      icon: featureIcons.kitchen,
    },
    camper.TV && { key: "TV", label: "TV", icon: featureIcons.TV },
    camper.bathroom && {
      key: "bathroom",
      label: "Bathroom",
      icon: featureIcons.bathroom,
    },
    camper.petrol && {
      key: "petrol",
      label: "Petrol",
      icon: featureIcons.petrol,
    },
  ].filter(Boolean);

  const camperDetails = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-main mb-4">{camper.name}</h1>
        <div className=" flex items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="fill-rating">
              <StarSvg />
            </span>
            <span>
              {camper.rating || "4.4"} {camper.reviews?.length || 2} Reviews
            </span>
          </div>

          <div className="flex items-center gap-1">
            <LocationSvg />
            <span>{camper.location}</span>
          </div>
        </div>
        <p className="text-2xl font-semibold text-main">
          {"\u20AC"} {Number(camper.price).toLocaleString("de-De")}
        </p>
      </div>

      {/* Gallery */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {camper.gallery.map((image, index) => (
            <img
              src={image.original}
              alt={camper.name}
              key={index}
              className="rounded-lg object-cover h-80"
            />
          ))}
        </div>
      </div>

      <div className="dat-form-container flex gap-[40px]">
        <div className="tabs-container ">
          {/* Tabs */}
          {/* <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-6">
              {features.map((feature) => (
                <div
                  key={feature.key}
                  className="flex items-center gap-2 bg-badges px-4 py-2 rounded-full"
                >
                  {feature.icon}
                  <span className="text-sm">{feature.label}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Camper details */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-4">Vehicle details</h3>
            <div>
              {camperDetails.map((detail, index) => (
                <div className="flex justify-between">
                  <span className="font-medium">{detail.label}</span>
                  <span className="font-medium">{detail.value || "-"}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* reviews */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          </div>
        </div>
        {/* Форма бронювання */}
        <div className="bg-gray-50 p-6 rounded-md shadow-md max-w-[600px]">
          <h2 className="text-xl font-semibold mb-4">Book this camper</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Booking successful!");
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded"
            />
            <input type="date" required className="w-full p-2 border rounded" />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
