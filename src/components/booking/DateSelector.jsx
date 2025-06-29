import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './DateSelector.css';

const DateSelector = ({ dates, onDateChange }) => {
  const [selectedDates, setSelectedDates] = useState({
    checkIn: dates.checkIn || null,
    checkOut: dates.checkOut || null,
    nights: dates.nights || 0
  });
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);

  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      const nights = Math.ceil((selectedDates.checkOut - selectedDates.checkIn) / (1000 * 60 * 60 * 24));
      const updatedDates = { ...selectedDates, nights };
      setSelectedDates(updatedDates);
      onDateChange(updatedDates);
    }
  }, [selectedDates.checkIn, selectedDates.checkOut, onDateChange]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateInRange = (date) => {
    if (!selectedDates.checkIn || !selectedDates.checkOut || !date) return false;
    return date > selectedDates.checkIn && date < selectedDates.checkOut;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    const dateTime = date.getTime();
    return (selectedDates.checkIn && dateTime === selectedDates.checkIn.getTime()) ||
           (selectedDates.checkOut && dateTime === selectedDates.checkOut.getTime());
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;

    if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
      // Start new selection
      setSelectedDates({
        checkIn: date,
        checkOut: null,
        nights: 0
      });
      setSelectingCheckOut(true);
    } else if (selectedDates.checkIn && !selectedDates.checkOut) {
      // Select check-out date
      if (date > selectedDates.checkIn) {
        setSelectedDates(prev => ({
          ...prev,
          checkOut: date
        }));
        setSelectingCheckOut(false);
      } else {
        // If selected date is before check-in, restart selection
        setSelectedDates({
          checkIn: date,
          checkOut: null,
          nights: 0
        });
      }
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const formatDate = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="date-selector">
      <h3 className="section-title">Select your dates</h3>
      
      {/* Date Input Display */}
      <div className="date-inputs">
        <div className={`date-input ${!selectingCheckOut ? 'active' : ''}`}>
          <label>Check-in</label>
          <div className="date-display">
            {formatDate(selectedDates.checkIn)}
          </div>
        </div>
        
        <div className="date-separator">
          <span>→</span>
        </div>
        
        <div className={`date-input ${selectingCheckOut ? 'active' : ''}`}>
          <label>Check-out</label>
          <div className="date-display">
            {formatDate(selectedDates.checkOut)}
          </div>
        </div>
        
        {selectedDates.nights > 0 && (
          <div className="nights-display">
            <span className="nights-count">{selectedDates.nights}</span>
            <span className="nights-label">night{selectedDates.nights !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="calendar-container">
        <div className="calendar-header">
          <button 
            className="nav-button"
            onClick={() => navigateMonth(-1)}
            disabled={currentMonth.getMonth() === new Date().getMonth() && 
                     currentMonth.getFullYear() === new Date().getFullYear()}
          >
            ←
          </button>
          
          <h4 className="month-year">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          
          <button 
            className="nav-button"
            onClick={() => navigateMonth(1)}
          >
            →
          </button>
        </div>

        <div className="calendar-grid">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {getDaysInMonth(currentMonth).map((date, index) => (
            <motion.div
              key={index}
              className={`calendar-day ${
                !date ? 'empty' : ''
              } ${
                isDateDisabled(date) ? 'disabled' : ''
              } ${
                isDateSelected(date) ? 'selected' : ''
              } ${
                isDateInRange(date) ? 'in-range' : ''
              }`}
              onClick={() => handleDateClick(date)}
              whileHover={!isDateDisabled(date) ? { scale: 1.1 } : {}}
              whileTap={!isDateDisabled(date) ? { scale: 0.95 } : {}}
            >
              {date ? date.getDate() : ''}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Date Selection */}
      <div className="quick-dates">
        <h4>Quick selection</h4>
        <div className="quick-date-buttons">
          <button 
            className="quick-date-btn"
            onClick={() => {
              const checkIn = new Date();
              checkIn.setDate(checkIn.getDate() + 1);
              const checkOut = new Date();
              checkOut.setDate(checkOut.getDate() + 3);
              setSelectedDates({ checkIn, checkOut, nights: 2 });
              setSelectingCheckOut(false);
            }}
          >
            Weekend (2 nights)
          </button>
          <button 
            className="quick-date-btn"
            onClick={() => {
              const checkIn = new Date();
              checkIn.setDate(checkIn.getDate() + 1);
              const checkOut = new Date();
              checkOut.setDate(checkOut.getDate() + 8);
              setSelectedDates({ checkIn, checkOut, nights: 7 });
              setSelectingCheckOut(false);
            }}
          >
            Week (7 nights)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
