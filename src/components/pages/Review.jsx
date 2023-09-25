import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Review() {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [comment, setComment] = useState('')
  const navigate = useNavigate();

  const handleText = () => {
    switch (number) {
      case 0:
        return "Evaluate";
      case 1:
        return "Dissatifation";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "Evaluate";
    }
  };

  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0:
        return "Comment here...";
      case 1:
        return "Sorry for the bad experience";
      case 2:
        return "What is your problem ? ";
      case 3:
        return "Anything to make us more better ?";
      case 4:
        return "Thank you for choosing us";
      case 5:
        return "Why do you like this event";
      default:
        return "Comment Here...";
    }
  };
  const handleSubmit = (event) => {
    console.log('An essay was submitted: ' + comment + number);
    event.preventDefault()
  }
  return (
    <div className="text-center h-[65vh] w-screen overscroll-none">
      <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25">
        <form>
          <div className="flex p-5 flex flex-col items-center justify-center bg-white rounded-xl w-[300px] max-h-[50vh] ">
            <h1 className="text-xl font-bold mb-5">Rate us below !</h1>
            <div>
              <p>
                {handleText()}, {handlePlaceHolder()}
              </p>
            </div>
            <div className="flex duration-500 cursor-pointer my-2 hover:-translate-y-1">
              {Array(5)
                .fill()
                .map((_, index) =>
                  number >= index + 1 || hoverStar >= index + 1 ? (
                    <AiFillStar
                      className="w-8 h-8"
                      key={index}
                      onMouseOver={() => setHoverStar(index + 1)}
                      onMouseLeave={() => setHoverStar(undefined)}
                      style={{ color: "orange" }}
                      onClick={() => setNumber(index + 1)}
                    />
                  ) : (
                    <AiOutlineStar
                      className="w-8 h-8"
                      key={index}
                      onMouseOver={() => setHoverStar(index + 1)}
                      onMouseLeave={() => setHoverStar(undefined)}
                      style={{ color: "orange" }}
                      onClick={() => setNumber(index + 1)}
                    />
                  )
                )}
            </div>
            <textarea
              className="w-full rounded-md p-2 h-40 border min-h-[50px]"
              placeholder="comment here..."
              id="comment"
              onChange={(e)=> setComment(e.target.value)}
            />
            <div>
              <input
                type="submit"
                className="bg-primaryColor text-white mt-2 rounded-md cursor-pointer py-2 px-3 hover:duration-500 hover:-translate-y-1 disabled:bg-gray-300"
                onClick={(e)=>handleSubmit(e)}
                disabled={number === 0}
              >
              </input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
