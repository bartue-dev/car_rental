import QuickActions from '@/components/dashboard/quickActions';
import RecentBookings from '@/components/dashboard/recentBookingTable';
import WeeklySummary from '@/components/dashboard/weeklySummary';

function Main() {

  return (
    <div >
      <WeeklySummary/>
      <RecentBookings/>
      <QuickActions/>
    </div>
  )
}

export default Main;