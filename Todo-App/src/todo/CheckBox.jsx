import { Check } from 'lucide-react'
import React from 'react'

const CheckBox = ({label,checked,onChange}) => {
  console.log("CheckBox");
  
  return (
    <label className='flex gap-4 items-center cursor-pointer'
    >
      <input type='checkbox'
      className='hidden'
      checked={checked}
      onChange={onChange}
      />
      <div className={`flex size-6 items-center gap-2 border-2 border-secondary 
        rounded-md ${checked?'bg-accent border-none':'bg-transparent'}`}>
       {checked && <Check className='text-black size-4'/> }
      </div>
      <span className={`flex-1 w-full ${
        checked?'line-through text-accent':'text-white'
      }`}>{label}</span>
    </label>
  )
}

export default CheckBox