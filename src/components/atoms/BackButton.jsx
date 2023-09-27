import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const BackButton = (props) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center text-2xl font-bold my-8">
      <MdArrowBackIosNew
        className="mr-8 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      {props.children}
    </div>
  );
};
