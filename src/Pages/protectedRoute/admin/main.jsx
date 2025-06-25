import RecentBookings from '@/components/recentBookingTable';
import WeeklySummary from '@/components/weeklySummary';
import { Car, ClipboardCheck, ArrowLeftToLine,  ArrowRightToLine  } from 'lucide-react';

function Main() {

  return (
    <div >
      <WeeklySummary/>
      <RecentBookings/>
     <div className="flex justify-between items-center mt-10">
        <div className="border rounded-sm w-60 p-5 flex items-center gap-5 shadow-xs">
          <Car size={45} strokeWidth={1}/>
          <div>
            <h1 className="text-sm">Total vehicles</h1>
            <p className="text-xl">23</p>
          </div>
        </div>
        <div className="border rounded-sm w-60 p-5 flex items-center gap-5 shadow-xs">
          <ClipboardCheck size={30} strokeWidth={1}/>
          <div>
            <h1 className="text-sm">Rented</h1>
            <p className="text-xl">15</p>
          </div>
        </div>
        <div className="border rounded-sm w-60 p-5 flex items-center gap-5 shadow-xs">
          <ArrowLeftToLine size={30} strokeWidth={1}/>
          <div>
            <h1 className="text-sm">To be return</h1>
            <p className="text-xl">5</p>
          </div>
        </div>
        <div className="border rounded-sm w-60 p-5 flex items-center gap-5 shadow-xs">
          <ArrowRightToLine size={30} strokeWidth={1}/>
          <div>
            <h1 className="text-sm">To be pick</h1>
            <p className="text-xl">2</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;