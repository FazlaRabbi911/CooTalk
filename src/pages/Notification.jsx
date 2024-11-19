import React, { useState } from "react";

const Notification = () => {
  const [cards, setCards] = useState([]); // State to store the list of cards
  const [zoomedCardId, setZoomedCardId] = useState(null); // State to track the zoomed-in card
  const [notes, setNotes] = useState({}); // State to track notes (heading and content) for each card

  const addCard = () => {
    const newCardId = cards.length;
    setCards((prevCards) => [
      ...prevCards,
      {
        id: newCardId, // Unique ID for each card
        isRotated: false, // Initial state for card rotation
      },
    ]);
    setNotes((prevNotes) => ({
      ...prevNotes,
      [newCardId]: { heading: "New Note", content: "" },
    }));
  };

  const toggleRotate = (id) => {
    if (zoomedCardId === null) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isRotated: !card.isRotated } : card
        )
      );
    }
  };

  const removeCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    setNotes((prevNotes) => {
      const updatedNotes = { ...prevNotes };
      delete updatedNotes[id];
      return updatedNotes;
    });
  };

  const handleZoomIn = (id) => {
    setZoomedCardId(id); // Set the clicked card as zoomed-in
  };

  const handleZoomOut = () => {
    setZoomedCardId(null); // Reset zoom when clicking outside
  };

  const handleNoteChange = (id, key, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: { ...prevNotes[id], [key]: value },
    }));
  };

  return (
    <div className="w-full relative h-full flex flex-col items-center">
      {/* Button to Add New Card */}
      <button
        onClick={addCard}
        className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add Card
      </button>

      {/* Cards Container */}
      <div className="w-full h-full">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${
              zoomedCardId === card.id
                ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] transition-all duration-700"
                : "relative w-[300px] h-[300px] m-4 transition-all duration-700"
            }`}
            onDoubleClick={() => handleZoomIn(card.id)} // Zoom-in on double-click
          >
            <div
              className={`relative h-full w-full transition-transform duration-1000 transform-style-preserve-3d ${
                // Apply rotation only if not zoomed in
                card.isRotated ? "rotate-y-180" : ""
              } `}
               // Rotation logic is allowed only when not zoomed
            >
              {/* Front Side */}
              <div onClick={() => toggleRotate(card.id)}
                className={` absolute inset-0 flex flex-col items-center justify-center transform backface-hidden bg-[#21273d] p-20 rounded-2xl shadow-lg ${
                  zoomedCardId === card.id ? "hidden" : "" // Hide the front side when zoomed in
                }`}
              >
                <h3 className="text-4xl font-bold uppercase font-roboto text-white mt-5">
                  Front
                </h3>
              </div>

              {/* Back Side */}
              <div 
                className={`absolute inset-0 flex flex-col items-center justify-center transform rotate-y-180 bg-[#45a1e8] rounded-2xl shadow-lg backface-hidden ${
                  zoomedCardId === card.id ? "" : "cursor-pointer"
                }`}
              >
                <button  onClick={handleZoomOut}>FFF</button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (zoomedCardId === card.id) {
                      handleZoomOut(); // Zoom out if the same card is clicked when zoomed in
                      toggleRotate(card.id)
                    } else {
                      toggleRotate(card.id); // Rotate the card if not zoomed in
                    }
                  }}
                  className="absolute top-0 left-0 px-4 py-2 border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-[#45a1e8] transition"
                >

                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCard(card.id);
                  }}
                  className="absolute top-0 right-0 px-4 py-2 border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-[#45a1e8] transition"
                >
                  x
                </button>

                <div className="h-[60%] text-center text-white w-full">
                  <textarea
                    className="h-10 font-bold text-xl bg-transparent outline-none border-none text-center"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) =>
                      handleNoteChange(card.id, "heading", e.target.textContent)
                    }
                  >
                    {notes[card.id]?.heading}
                  </textarea>
                  <textarea
                    className="h-[90%] w-[90%] overflow-y-auto p-2 bg-[#d9f2ff] text-black rounded-md outline-none"
                    contentEditable
                    onInput={(e) =>
                      handleNoteChange(card.id, "content", e.target.textContent)
                    }
                  >
                    {notes[card.id]?.content}
                  </textarea>
                </div>
              </div>
            </div>
            
          </div>
          
        ))}
      </div>

    </div>
  );
};

export default Notification;