import { useMemo, useState } from "react"
import { addMonths, setMonth as setDateMonth, setYear } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { cn } from "@/lib/utils"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function Calendar({ date, onDateChange, className }) {
  const initialMonth = useMemo(() => date ?? new Date(), [date])
  const [month, setMonth] = useState(initialMonth)

  const handleSelect = (day) => {
    onDateChange(day)
    if (day) {
      setMonth(day)
    }
  }

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10)
    setMonth(prev => setDateMonth(prev, newMonth))
  }

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10)
    setMonth(prev => setYear(prev, newYear))
  }

  const goToMonth = (direction) => {
    setMonth(prev => addMonths(prev, direction === "next" ? 1 : -1))
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i)

  return (
    <div className={cn("rounded-md border border-gray-200 bg-white p-3 shadow-sm min-w-[260px] w-fit", className)}>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => goToMonth("prev")}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          <select
            value={month.getMonth()}
            onChange={handleMonthChange}
            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f3b927]"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={month.getFullYear()}
            onChange={handleYearChange}
            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f3b927]"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => goToMonth("next")}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <DayPicker
  mode="single"
  month={month}
  onMonthChange={setMonth}
  selected={date}
  onSelect={handleSelect}
  showOutsideDays
  className="text-gray-900"
  classNames={{
    months: "space-y-0",
    month: "space-y-0",

    caption: "hidden h-0 m-0 p-0",
    caption_label: "hidden",
    nav: "hidden",

    table: "w-full border-collapse",
    head_row: "grid grid-cols-7 text-center",
    head_cell: "text-gray-500 font-semibold text-[0.75rem] tracking-wide",
    row: "grid grid-cols-7 gap-0",
    cell: "text-center text-sm p-0 relative",
    day: cn(
      "h-8 w-8 p-0 font-medium rounded-md cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f3b927]",
      "aria-selected:opacity-100"
    ),
    day_selected: "!bg-[#f3b927] !text-white shadow hover:!bg-[#d9a620]",
    day_today: "border border-[#f3b927] text-[#f3b927]",
    day_outside: "text-gray-400 opacity-60",
    day_disabled: "text-gray-300 opacity-50",
    day_hidden: "invisible",
  }}
/>
  
    </div>
  )
}
