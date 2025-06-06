import { useState } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isToday,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTitle } from "@/components/PageTitle";

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Property Viewing - Downtown Loft",
    description: "Showing property to potential tenant",
    color: "bg-blue-500",
    date: new Date(2025, 4, 29), // May 29, 2025
  },
  {
    id: "2",
    title: "Lease Signing - Sunset Apartments",
    description: "Contract signing with new tenant",
    color: "bg-green-500",
    date: new Date(2025, 4, 29),
  },
  {
    id: "3",
    title: "Maintenance Check",
    description: "Routine inspection and repairs",
    color: "bg-orange-500",
    date: new Date(2025, 4, 30),
  },
  {
    id: "4",
    title: "Tenant Meeting",
    description: "Monthly check-in with tenant",
    color: "bg-purple-500",
    date: new Date(2025, 5, 2),
  },
  {
    id: "5",
    title: "Property Inspection",
    description: "Annual safety inspection",
    color: "bg-red-500",
    date: new Date(), // Today
  },
];

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof mockEvents)[0] | null
  >(null);

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentDate(subDays(currentDate, 30));
    } else {
      setCurrentDate(addDays(currentDate, 30));
    }
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter((event) => isSameDay(event.date, date));
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="flex-1 bg-white">
        {/* Week header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day) => (
            <div
              key={day}
              className="px-3 py-2 text-center text-xs font-medium tracking-wide text-gray-500 uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7" style={{ minHeight: "600px" }}>
          {days.map((day, dayIdx) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);

            return (
              <div
                key={dayIdx}
                className={cn(
                  "min-h-[120px] cursor-pointer border-r border-b border-gray-200 p-1 hover:bg-gray-50",
                  !isCurrentMonth && "bg-gray-50 text-gray-400",
                  isSelected && "bg-blue-50",
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium",
                      isTodayDate && "bg-primary text-white",
                      !isTodayDate && !isCurrentMonth && "text-gray-400",
                      !isTodayDate && isCurrentMonth && "text-gray-900",
                    )}
                  >
                    {format(day, "d")}
                  </span>
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "cursor-pointer truncate rounded p-1 text-xs text-white hover:opacity-80",
                        event.color,
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="px-1 text-xs text-gray-500">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <PageTitle title="Booking Calendar" />
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <h1 className="text-xl font-medium text-gray-900">
            {format(currentDate, "MMMM yyyy")}
          </h1>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Calendar Content */}
      {renderMonthView()}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <div
                  className={cn(
                    "mb-2 inline-block rounded-full px-3 py-1 text-xs text-white",
                    selectedEvent.color,
                  )}
                >
                  Event
                </div>
                <h4 className="font-medium text-gray-900">
                  {selectedEvent.title}
                </h4>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  {selectedEvent.description}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong>{" "}
                  {format(selectedEvent.date, "EEEE, MMMM d, yyyy")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button>Edit Event</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
