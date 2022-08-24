import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SaveStopIcon(props) {
  const { stop } = props;
  let savedStops = JSON.parse(localStorage.getItem("saved-stops")) || [];
  const [isSaved, setIsSaved] = useState(
    savedStops.some((element) => element.key === stop.key)
  );

  const toggleSave = () => {
    if (!isSaved) {
      savedStops.push(stop);
      toast.success("Stop saved!!");
    } else {
      const index = savedStops.findIndex((element) => element.key === stop.key);
      savedStops.splice(index, 1);
      toast.success("Stop unsaved!!");
    }
    localStorage.setItem("saved-stops", JSON.stringify(savedStops));
  };

  const handleClick = (e) => {
    e.stopPropagation();
    toggleSave(stop);
    setIsSaved(!isSaved);
  };
  return (
    <>
      {isSaved ? (
        <BookmarkRemoveIcon onClick={(e) => handleClick(e)} />
      ) : (
        <BookmarkBorderIcon onClick={(e) => handleClick(e)} />
      )}
    </>
  );
}
