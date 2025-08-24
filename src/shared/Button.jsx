import React from 'react'

const Button = ({ text, onClick, variant = "primary", className = "", disabled = false }) => {
  const baseClasses = "font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-button focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = "text-sm sm:text-base px-6 sm:px-10 lg:px-12 py-3 sm:py-4";
  
  const variantClasses = {
    primary: "bg-button text-white hover:bg-button-hover disabled:hover:bg-button",
    secondary: "bg-transparent text-button border-2 border-button hover:bg-button hover:text-white",
    outline: "bg-white text-button border border-button hover:bg-badges"
  };

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button 
      onClick={onClick} 
      className={combinedClasses}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;