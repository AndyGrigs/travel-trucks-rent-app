import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperDetails } from "../redux/campersSlice";
import ACSvg from "../shared/ACSvg";
import AutomaticSvg from "../shared/AutomaticSvg";
import KitchenSvg from "../shared/KitchenSvg";
import TVSvg from "../shared/TVSvg";
import BathroomSvg from "../shared/BathroomSvg";
import PetrolSvg from "../shared/PetrolSvg";
import Loader from "../shared/Loader";
import StarSvg from "../shared/StarSvg";
import LocationSvg from "../shared/LocationSvg";
import Button from "../shared/Button";

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
  const dispatch = useDispatch();
  const { currentCamper: camper, loading } = useSelector((state) => state.campers);
  const [activeTab, setActiveTab] = useState("features");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: ''
  });

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Booking successful!");
    setFormData({ name: '', email: '', bookingDate: '', comment: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    <div className="container mx-auto px-4 lg:px-16 py-6 lg:py-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl  font-semibold text-main mb-4">{camper.name}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <StarSvg filled />
            <span className="text-main">
              {camper.rating || "4.4"} ({camper.reviews?.length || 2} Reviews)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LocationSvg />
            <span className="text-main">{camper.location}</span>
          </div>
        </div>
        <p className="text-xl lg:text-2xl font-semibold text-main">
          €{Number(camper.price).toLocaleString("de-DE")}.00
        </p>
      </div>

      {/* Gallery */}
      <div className="mb-6 lg:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {camper.gallery?.slice(0, 3).map((image, index) => (
            <img
              src={image.original}
              alt={`${camper.name} ${index + 1}`}
              key={index}
              className="rounded-lg object-cover h-60 lg:h-80 w-full"
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 lg:mb-8">
        <p className="text-gray leading-relaxed">{camper.description}</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
        {/* Tabs Content */}
        <div className="flex-1">
          {/* Tab Navigation */}
          <div className="flex border-b border-lightgray mb-6">
            <button
              onClick={() => setActiveTab("features")}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "features"
                  ? "border-button text-button"
                  : "border-transparent text-gray hover:text-main"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-button text-button"
                  : "border-transparent text-gray hover:text-main"
              }`}
            >
              Reviews
            </button>
          </div>

          {activeTab === "features" && (
            <div className='bg-[#f7f7f7] p-[44px]'>
              <div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  {features.map((feature) => (
                    <div
                      key={feature.key}
                      className="flex items-center gap-2 bg-[#ececee] px-4 py-2 rounded-full"
                    >
                      {feature.icon}
                      <span className="text-sm font-medium text-main">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-main">Vehicle details</h3>
             
                <div className="space-y-3">
                  {camperDetails.map((detail, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <span className="font-medium text-main">{detail.label}</span>
                      <span className="font-medium text-main">{detail.value || "-"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-main">Reviews</h3>
              {camper.reviews && camper.reviews.length > 0 ? (
                <div className="space-y-6">
                  {camper.reviews.map((review, index) => (
                    <div key={index} className="border-b border-lightgray pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-badges rounded-full flex items-center justify-center">
                          <span className="font-semibold text-button">
                            {review.reviewer_name?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-main">{review.reviewer_name || 'Anonymous'}</h4>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarSvg key={i} filled={i < (review.reviewer_rating || 5)} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray">{review.comment || 'Great camper!'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray">No reviews yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div className="w-full xl:w-[400px] flex-shrink-0">
          <div className="bg-white border border-lightgray p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-main">Book your campervan now</h2>
            <p className="text-gray mb-6">Stay connected! We are always ready to help you.</p>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name*"
                required
                className="w-full p-3 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email*"
                required
                className="w-full p-3 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent"
              />
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Comment"
                rows="4"
                className="w-full p-3 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent resize-none"
              />
              <Button 
                text="Send" 
                variant="primary" 
                className="w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;