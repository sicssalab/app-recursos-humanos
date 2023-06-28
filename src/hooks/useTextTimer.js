import { useEffect, useState } from "react";
import dateUtils from "../utils/dateUtils";

const useTextTimer = (date) => {
    const [inDate, setInDate] = useState("");

    useEffect(() => {
        let interval = null;
        if(date){
            setInDate(dateUtils.timeEstimation(date)); //first time
            interval = setInterval(() => {
                setInDate(dateUtils.timeEstimation(date))
            }, 1000 * 60);
        }
        return () => {
            if(interval)
                clearInterval(interval);
        }
    },[]);
    return inDate;
}
 
export default useTextTimer;