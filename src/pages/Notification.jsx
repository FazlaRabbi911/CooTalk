import React from 'react'

const Notification = () => {
  return (
<div class="relative w-64 h-64 mx-auto">
  <div class="group relative h-full w-full">

    <div class="relative h-full w-full bg-[#21273d] p-20 rounded-2xl shadow-lg transition-transform duration-1000 transform-style-preserve-3d group-hover:rotate-y-180">

      <div class="absolute inset-0 flex flex-col items-center justify-center transform translate-z-[150px] backface-hidden">
        <h3 class="text-4xl font-bold uppercase font-roboto text-white mt-5">Front</h3>
        <i class="text-4xl text-[#496eff] shadow-lg"></i>
      </div>

      <div class="absolute inset-0 flex flex-col items-center justify-center transform rotate-y-180 bg-[#45a1e8] rounded-2xl shadow-lg backface-hidden">
        <p class="text-lg font-roboto font-semibold text-white mb-4">Back</p>
        <button class="px-4 py-2 border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-[#45a1e8] transition">
          Button
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Notification
