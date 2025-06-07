import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick} 
        className="bg-button text-white text-[16px] font-medium px-[60px] py-[16px] rounded-[200px] hover:bg-button-hover transition">
         {text}
      </button>
  )
}

export default Button