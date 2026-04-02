import { useDispatch } from "react-redux";
import { setError } from "~/store/features/errorSlice";
// import { addToast } from "~/store/features/toastSlice";

export const useErrorHandler = () => {
    
    const dispatch = useDispatch();

    const handleError = (error: Error) => {
        dispatch(setError(error.message));
    };
    
    return { handleError };
}