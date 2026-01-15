import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hidePopup } from "../store/uiSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";

const Popup = () => {
  const { message, visible, undoAction, itemData, viewAction } = useSelector(
    (state) => state.ui.popup
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userEmail = user?.user?.email || user?.email;

  const handleUndo = () => {
    if (undoAction === "add") {
      dispatch(addToFavorites({ ...itemData, userEmail }));
    } else if (undoAction === "remove") {
      dispatch(removeFromFavorites({ ...itemData, userEmail }));
    }
    dispatch(hidePopup());
  };

  const handleView = () => {
    if (viewAction === 'favorites') {
      navigate('/favourites');
    }
    dispatch(hidePopup());
  };

  useEffect(() => {
    if (visible) {
      const timeout = (undoAction || viewAction) ? 2000 : 1500;
      const timer = setTimeout(() => {
        dispatch(hidePopup());
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [visible, undoAction, viewAction, dispatch]);

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
          {viewAction && (
            <button
              onClick={handleView}
              className="ml-4 text-blue-400 hover:text-blue-300 underline"
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
