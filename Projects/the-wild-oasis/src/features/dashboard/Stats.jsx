import Stat from "./Stat.jsx";
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers";

function Stats({bookings, confirmedStays, numDays, cabinCount}) {
    const numBookings = bookings.length;
    const sales = bookings.reduce( (acc, cur) => acc + cur.totalPrice, 0);
    const checkins = confirmedStays.length;
    const occupation = confirmedStays.reduce( (acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

    return (
        <>
            <Stat icon={<HiOutlineBriefcase/>} value={numBookings} color="blue" title="Bookings"/>
            <Stat icon={<HiOutlineBanknotes/>} value={formatCurrency(sales)} color="green" title="Sales"/>
            <Stat icon={<HiOutlineCalendarDays/>} value={checkins} color="indigo" title="Check ins"/>
            <Stat icon={<HiOutlineChartBar/>} value={`${Math.ceil(occupation * 100)}%`} color="yellow" title="Occupancy rate"/>
        </>
    )
}

export default Stats;