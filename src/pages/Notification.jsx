import React, { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { FaRotateLeft } from "react-icons/fa6";
import moment from 'moment'

const Notification = () => {
  const [notedata, setnotedata] = useState([]); // Stores fetched notes data
  const [zoomedCardId, setZoomedCardId] = useState(null); // Tracks zoomed-in card
  const [rotationState, setRotationState] = useState({}); // Tracks rotation state per card
  const[nodeheading,setnodeheading] = useState('')
  const[nodeContent,setnodeContent] = useState('')
  const db = getDatabase();
  const user = useSelector((state) => state.storeuser.value);

  // Fetch notes data from Firebase Realtime Database
  useEffect(() => {

    const Notes = ref(db, "Notes");
    onValue(Notes, (snapshot) => {
      const arry = [];
      snapshot.forEach((item) => {
        if(user.uid == item.val().Adminuid){
          arry.push({ ...item.val(), itemkey: item.key });
        }
      });
      setnotedata(arry);
    });
  }, []);

  const handleZoomIn = (id) => {
    setZoomedCardId(id); // Set zoomed card ID
  };

  const handleZoomOut = (itemKey) => {
    setZoomedCardId(null); // Reset zoomed card ID
  
    // Update the specific note in Firebase
    set(ref(db, `Notes/${itemKey}`), {
      Adminuid: user.uid,
      NoteKey: itemKey,
      nodeheading: nodeheading || "Add", // Use default if empty
      nodeContent: nodeContent || "Default Content", // Use default if empty
      Time: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
    });
  };


  const toggleRotate = (id) => {
    setRotationState((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle rotation state for the specific card
    }));
  };

  const handlecreatNote = () => {
    setnodeheading("");
    setnodeContent("");
    // Create a new note in Firebase
    const Note = push(ref(db, "Notes"));
    const noteKey = Note.key;
    set(Note, {
      Adminuid: user.uid,
      NoteKey: noteKey,
    });
  };
  const handleHeadingChange = (e) =>  {setnodeheading(e.target.value) ,console.log(e.target.value,nodeContent)};
const handleContentChange = (e) => setnodeContent(e.target.value);

const handleDeleteNote = (itemKey) => {
  remove(ref(db, `Notes/${itemKey}`)) // Remove the note from Firebase
    .then(() => {
      // Optionally handle UI feedback after successful delete (e.g., remove from state)
      setnotedata((prevData) => prevData.filter((item) => item.itemkey !== itemKey));
    })
    .catch((error) => {
      console.error("Error deleting note: ", error);
    });
};
  return (
    <div className="w-full relative h-full flex flex-col items-center">
      <button
        onClick={handlecreatNote}
        className="mb-8 px-4 mr-auto m-12 py-2 bg-gray-400 text-white rounded hover:bg-blue-600"
      >
        Add Note Box
      </button>
      <div className="w-full h-full flex flex-wrap overflow-auto">
        {notedata.map((item) => (
          <div
            key={item.itemkey}
            className={`${
              zoomedCardId === item.itemkey
                ? "absolute top-1/2 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] transition-all duration-700"
                : "relative w-[300px] h-[300px] m-4 transition-all duration-700"
            }`}
            > 
            <div  
                style={{
                  userSelect: "none", // Disable text selection
                }}
                className={`relative h-full w-full transition-transform duration-1000 transform-style-preserve-3d ${
                  rotationState[item.itemkey] ? "rotate-y-180" : ""
                }`}
            >
              {/* Front Side */}
                <div  
                    onClick={() => toggleRotate(item.itemkey)}
                    className={` absolute inset-0 h-full w-full flex flex-col justify-between transform backface-hidden bg-[#21273d] p-20 rounded-2xl shadow-lg ${
                      zoomedCardId === item.itemkey ? "hidden" : ""
                    }`}
                    style={{
                      transform: 'translateZ(150px)',
                      transformStyle: 'preserve-3d',
                    }}
                    >
                      <div>
                      <h3
                        className="text-2xl font-bold uppercase font-roboto text-white py-2 break-words overflow-hidden text-center"
                        style={{
                          transform: 'translateZ(150px)',
                          wordBreak: "break-word", // Ensure long words wrap
                          maxWidth: "90%",         // Constrain width within the parent
                          whiteSpace: "normal",    // Allow wrapping for multiline text
                          maxHeight: "4.5em",      // Limit to 3 lines of text
                          display: "-webkit-box",  // Required for line-clamp
                          WebkitLineClamp: 3,      // Show up to 3 lines
                          WebkitBoxOrient: "vertical", // Required for line-clamp
                          overflow: "hidden",      // Hide overflow with ellipsis
                          textOverflow: "ellipsis",// Add ellipsis for clipped text
                        }}
                      >
                        {item.NoteKey === item.itemkey && item.nodeheading
                          ? item.nodeheading
                          : "Add Note"}
                      </h3>
                    </div>
                    <div>
                    <p
                        className="text-gray-400 font-mono text-center text-ellipsis overflow-hidden"
                        style={{marginTop:'50px',
                          wordBreak: "break-word", // Ensure long text breaks gracefully
                          maxWidth: "90%",         // Constrain the width of the text
                        }}
                      >
                        {item.NoteKey === item.itemkey && item.nodeheading
                          ? moment(item.Time, "YYYYMMDD h:mm:ss ").fromNow()
                          : ""}
                      </p>
                    </div>
              </div>
  
              {/* Back Side */}
              <div                
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    handleZoomIn(item.itemkey);
                  }}
                  className={`absolute inset-0 flex flex-col items-center justify-center transform rotate-y-180 bg-[#18344a] rounded-2xl shadow-lg backface-hidden ${
                    zoomedCardId === item.itemkey ? "" : "cursor-pointer"
                  }`}
                  style={{
                    transform: 'translateZ(50px) rotateY(180deg)', // Combine all transforms here
                    transformStyle: 'preserve-3d',
                  }}
              >  
                <button
                  className="absolute group top-0 right-0 px-4 py-2 border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-[#45a1e8] transition"
                  onClick={() => handleDeleteNote(item.itemkey)} // Delete note on click
                >
                  x
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (zoomedCardId === item.itemkey) {
                      handleZoomOut(item.itemkey);
                      toggleRotate(item.itemkey);
                    } else {
                      toggleRotate(item.itemkey);
                    }
                  }}
                  className="absolute group top-0 left-0 px-4 py-2 border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-[#45a1e8] transition"
                >
                   {zoomedCardId === item.itemkey ? "Add" :<FaRotateLeft  className="group-hover:rotate-[-145deg] transition duration-300"/>}
                </button>
                {zoomedCardId === item.itemkey && <button onClick={()=>{setZoomedCardId(null),toggleRotate(item.itemkey)}}  className="absolute top-0 left-24 px-4 py-2 border-2 border-white rounded-full bg-transparent text-white  hover:bg-red-500 hover:text-white transition">cancel</button>}
                <div className="h-[60%] text-center text-white w-full" >
                <textarea
                onChange={handleHeadingChange} placeholder="add heading"
                value={zoomedCardId === item.itemkey ? item.notedata : item.nodeheading || ""}
                className="h-10 font-bold text-xl bg-transparent outline-none border-none text-center"   maxLength={25}
                />
                <textarea
                  onChange={handleContentChange}
                  value={zoomedCardId === item.itemkey ? item.notedata : item.nodeContent || ""}
                  className="h-[90%] w-[90%] overflow-y-auto p-2 bg-[#d9f2ff] text-black rounded-md outline-none"
                />
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