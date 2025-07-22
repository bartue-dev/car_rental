import QuickActions from '@/components/dashboard/quickActions';
import RecentBookings from '@/components/dashboard/bookingComponents/recentBookingTable';
import DataSummary from '@/components/dashboard/dataSummary';

function Main() {

  return (
    <div >
      <DataSummary/>
      <RecentBookings/>
      <QuickActions/>
    </div>
  )
}

export default Main;