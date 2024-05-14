import { BadgeDollarSign, BarChart2, Calendar, LayoutDashboard, Users } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
  return (
      <div className="col-span-1 flex items-center justify-center bg-white">
        <div className="h-[700px] w-80 rounded-3xl bg-slate-800 -mt-10">
          <div className="flex flex-col justify-start gap-12 pl-20 pt-36 text-xl text-white">
            <h4 className="flex gap-2">
              <LayoutDashboard size={20} strokeWidth={1.5} />
              Dashboard
            </h4>
            <h4 className="flex gap-2">
              <Calendar />
              Event
            </h4>
            <h4 className="flex gap-2">
              <Users />
              Attendant
            </h4>
            <h4 className="flex gap-2">
              <BadgeDollarSign />
              Transaction
            </h4>
            <h4 className="flex gap-2">
              <BarChart2 />
              Statistic
            </h4>
          </div>
        </div>
      </div>
  )
}

export default Sidebar