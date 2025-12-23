import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hidePopup } from "../store/uiSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";

const Popup = () => {
  const { message, visible, undoAction, itemData } = useSelector(
    (state) => state.ui.popup
  );
  const dispatch = useDispatch();

  const handleUndo = () => {
    if (undoAction === "add") {
      dispatch(addToFavorites(itemData));
    } else if (undoAction === "remove") {
      dispatch(removeFromFavorites(itemData));
    }
    dispatch(hidePopup());
  };

  useEffect(() => {
    if (visible) {
      const timeout = undoAction ? 2000 : 1500;
      const timer = setTimeout(() => {
        dispatch(hidePopup());
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [visible, undoAction, dispatch]);

  return (
    <div
      className={`
        fixed top-20 right-4 z-100
        transition-all duration-300
        ${visible ? "pointer-events-auto" : "pointer-events-none"}
      `}
    >
      <div
        className={`
          bg-black text-white px-4 py-2 rounded-lg shadow text-sm
          transition-all duration-500 ease-out transform
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}
        `}
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          {undoAction && (
            <button
              onClick={handleUndo}
              className="ml-4 text-blue-400 hover:text-blue-300 underline"
            >
              Undo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
