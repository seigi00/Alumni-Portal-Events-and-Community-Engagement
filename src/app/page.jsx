'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';
import { MapPin, CalendarDays } from 'lucide-react';
import ducks from '@/components/images/ducks.jpeg';

export default function Home() {
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [formErrors, setFormErrors] = useState({});
    const [formTouched, setFormTouched] = useState({});
    const [formSuccess, setFormSuccess] = useState(false);

    function validateFormField(field, value) {
      switch (field) {
        case 'name':
          if (!value.trim()) return 'Name is required.';
          return '';
        case 'phone':
          if (!value.trim()) return 'Phone is required.';
          if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value)) return 'Enter a valid phone number.';
          return '';
        case 'email':
          if (!value.trim()) return 'Email is required.';
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Enter a valid email address.';
          return '';
        default:
          return '';
      }
    }

    function handleFormChange(e) {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setFormTouched((prev) => ({ ...prev, [name]: true }));
      setFormErrors((prev) => ({ ...prev, [name]: validateFormField(name, value) }));
      setFormSuccess(false);
    }

    function handleFormBlur(e) {
      const { name, value } = e.target;
      setFormTouched((prev) => ({ ...prev, [name]: true }));
      setFormErrors((prev) => ({ ...prev, [name]: validateFormField(name, value) }));
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      const errors = {
        name: validateFormField('name', form.name),
        phone: validateFormField('phone', form.phone),
        email: validateFormField('email', form.email),
      };
      setFormErrors(errors);
      setFormTouched({ name: true, phone: true, email: true });
      if (!errors.name && !errors.phone && !errors.email) {
        setFormSuccess(true);
        setForm({ name: '', phone: '', email: '' });
        setTimeout(() => setFormSuccess(false), 2000);
      }
    }
  const [selectedDate1, setSelectedDate1] = useState(undefined);
  const [selectedDate2, setSelectedDate2] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const allCategories = ['Webinar', 'Tech Talks', 'Alumni Reunion', 'Career Fairs'];

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const events = [
    {
      id: 1,
      title: 'Event Title',
      category: 'Tech Talks',
      description: 'Brief description of the event goes here. This is where you can add a short summary of what the event is about.',
      location: 'Location, City',
      date: 'Jan 29, 2026',
      time: '2:00 PM',
      image: ducks,
    },
    {
      id: 2,
      title: 'Another Event',
      category: 'Webinar',
      description: 'Another event description with relevant details about what attendees can expect.',
      location: 'Online',
      date: 'Feb 1, 2026',
      time: '6:00 PM',
      image: ducks,
    },
    {
      id: 3,
      title: 'Class of 2020 Reunion',
      category: 'Alumni Reunion',
      description: 'Join us for an exciting reunion with your classmates to celebrate achievements and reconnect.',
      location: 'Grand Ballroom',
      date: 'Feb 15, 2026',
      time: '7:00 PM',
      image: ducks,
    },
  ];

  const filteredEvents = events
    .filter(event =>
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategories.length === 0 || selectedCategories.includes(event.category))
    )
    .sort((a, b) => {
      // Prioritize selected categories first
      const aSelected = selectedCategories.includes(a.category);
      const bSelected = selectedCategories.includes(b.category);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      // If both selected, sort by the order they were selected
      if (aSelected && bSelected) {
        return selectedCategories.indexOf(a.category) - selectedCategories.indexOf(b.category);
      }
      return 0;
    });

  return (
    <div
      className="relative bg-gray-100 overflow-hidden"
      style={{ backgroundColor: '#EFEFEF', fontFamily: "'Source Sans Pro', sans-serif" }}
    >
      {/* Main Events Page */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Events and <span style={{ color: '#f3b927' }}>Community Engagement</span></h1>
        <p className="text-gray-600 mb-6 lg:mb-8 max-w-4xl italic text-sm sm:text-base">Discover upcoming events, connect with fellow alumni, and stay engaged with our vibrant community through our curated selection of virtual and onsite gatherings.</p>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 gap-y-8 max-w-7xl mx-auto">
          {/* Left Column: Calendar and Categories */}
          <aside className="w-full lg:w-auto lg:min-w-[300px] shrink-0">
            {/* Events Section */}
            <div id="events-section" className="mb-10">

              {/* Table of Contents - Horizontal Stepper */}
              <div className="mb-10">
                <div className="flex items-start justify-between px-2">
                  {/* Step 1 */}
                  <a href="#events-section" className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity group">
                    <div className="w-8 h-8 rounded-full bg-[#f3b927] flex items-center justify-center text-white text-xs font-bold mb-2 transition-colors group-hover:bg-black">1</div>
                    <span className="text-xs font-medium text-center text-[#f3b927] transition-colors group-hover:text-black">Events</span>
                  </a>
                  
                  {/* Connector */}
                  <div className="flex-1 h-0.5 bg-[#f3b927] mx-1 mt-4"></div>

                  {/* Step 2 */}
                  <a href="#registration" className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity group">
                    <div className="w-8 h-8 rounded-full bg-[#f3b927] flex items-center justify-center text-white text-xs font-bold mb-2 transition-colors group-hover:bg-black">2</div>
                    <span className="text-xs font-medium text-center text-[#f3b927] transition-colors group-hover:text-black">Registration</span>
                  </a>

                  {/* Connector */}
                  <div className="flex-1 h-0.5 bg-[#f3b927] mx-1 mt-4"></div>

                  {/* Step 3 */}
                  <a href="#virtual-onsite-section" className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity group">
                    <div className="w-8 h-8 rounded-full bg-[#f3b927] flex items-center justify-center text-white text-xs font-bold mb-2 transition-colors group-hover:bg-black">3</div>
                    <span className="text-xs font-medium text-center text-[#f3b927] transition-colors group-hover:text-black">Virtual &<br/>Onsite</span>
                  </a>

                  {/* Connector */}
                  <div className="flex-1 h-0.5 bg-[#f3b927] mx-1 mt-4"></div>

                  {/* Step 4 */}
                  <a href="#feedback-section" className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity group">
                    <div className="w-8 h-8 rounded-full bg-[#f3b927] flex items-center justify-center text-white text-xs font-bold mb-2 transition-colors group-hover:bg-black">4</div>
                    <span className="text-xs font-medium text-center text-[#f3b927] transition-colors group-hover:text-black">Feedback</span>
                  </a>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 mb-2 flex-wrap">
                <button
                  onClick={() => setSelectedFilter(selectedFilter === 'Today' ? null : 'Today')}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-white"
                  style={{
                    backgroundColor: selectedFilter === 'Today' ? '#f3b927' : '#000000'
                  }}
                  aria-pressed={selectedFilter === 'Today'}
                  aria-label="Filter events for Today"
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedFilter(selectedFilter === 'This Week' ? null : 'This Week')}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-white"
                  style={{
                    backgroundColor: selectedFilter === 'This Week' ? '#f3b927' : '#000000'
                  }}
                  aria-pressed={selectedFilter === 'This Week'}
                  aria-label="Filter events for This Week"
                >
                  This Week
                </button>
              </div>
              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setSelectedFilter(selectedFilter === 'Next Week' ? null : 'Next Week')}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-white"
                  style={{
                    backgroundColor: selectedFilter === 'Next Week' ? '#f3b927' : '#000000'
                  }}
                  aria-pressed={selectedFilter === 'Next Week'}
                  aria-label="Filter events for Next Week"
                >
                  Next Week
                </button>
              </div>

              {/* Calendar */}
              <div className="mb-1">
                <Calendar date={selectedDate1} onDateChange={setSelectedDate1} />
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900">Categories</h2>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {[...selectedCategories, ...allCategories.filter(c => !selectedCategories.includes(c))].slice(0, 2).map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className="px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 text-white"
                      style={{
                        backgroundColor: selectedCategories.includes(category) ? '#f3b927' : '#000000'
                      }}
                      aria-pressed={selectedCategories.includes(category)}
                      aria-label={selectedCategories.includes(category) ? `Deselect category ${category}` : `Select category ${category}`}
                    >
                      {selectedCategories.includes(category) && <span aria-hidden="true">✕</span>}
                      {category}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {[...selectedCategories, ...allCategories.filter(c => !selectedCategories.includes(c))].slice(2, 4).map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className="px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 text-white"
                      style={{
                        backgroundColor: selectedCategories.includes(category) ? '#f3b927' : '#000000'
                      }}
                    >
                      {selectedCategories.includes(category) && <span>✕</span>}
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Event List */}
          <main className="flex-1 lg:ml-4 gap-y-6 flex flex-col">
            {/* Search Bar */}
            <div className="mb-4 bg-white rounded-md shadow-sm p-2 sm:p-3 lg:p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-100"
                />
                <button
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-white bg-[#f3b927] transition-colors hover:bg-black hover:text-white"
                  aria-label="Search events"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4 mb-8">
              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-md shadow-sm p-12 text-center">
                  <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Events</h3>
                  <p className="text-gray-400">There are no events matching your criteria.</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-0 gap-y-4">
                    {/* Event Image */}
                    <div className="shrink-0 sm:w-48 md:w-56 lg:w-64 min-h-[120px]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={300}
                        height={250}
                        className="w-full h-32 sm:h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 gap-y-2">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                          <div
                            className="text-white px-3 py-1 text-sm font-semibold shrink-0"
                            style={{ backgroundColor: '#f3b927' }}
                          >
                            {event.category}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{event.description}</p>
                      </div>

                      {/* Event Details */}
                      <div className="flex flex-col gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#f3b927]" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-[#f3b927]" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                      </div>

                      {/* Register Link */}
                      <a href="#events-section-2" className="text-sm font-medium mt-4 hover:underline" style={{ color: '#f3b927' }}>
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center">
              <div className="inline-flex">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="px-3 py-2 text-sm bg-black text-white hover:opacity-80 transition-opacity rounded-l-md border-r border-gray-700"
                  aria-label="Previous page"
                >
                  &lt;
                </button>
                <button className="px-3 py-2 text-sm bg-black text-white hover:opacity-80 transition-opacity border-r border-gray-700">
                  1
                </button>
                <button className="px-3 py-2 text-sm bg-black text-white hover:opacity-80 transition-opacity border-r border-gray-700">
                  2
                </button>
                <button className="px-3 py-2 text-sm bg-black text-white hover:opacity-80 transition-opacity border-r border-gray-700">
                  3
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3 py-2 text-sm bg-black text-white hover:opacity-80 transition-opacity rounded-r-md"
                  aria-label="Next page"
                >
                  &gt;
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* Registration and Attendance Tracking */}
      <section id="registration" className="w-full py-12 mt-20 sm:mt-40 lg:mt-80 relative overflow-hidden" style={{ backgroundColor: '#E8C32C', clipPath: 'polygon(0 0, 100% 3.6%, 100% 98%, 0 100%)' }}>
        {/* Background Wave Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-15" preserveAspectRatio="none" viewBox="0 0 1440 560" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,229.3C672,256,768,288,864,277.3C960,267,1056,213,1152,197.3C1248,181,1344,203,1392,213.3L1440,224L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z"/>
          </svg>
          <svg className="absolute top-20 left-0 w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 1440 560" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M0,320L48,298.7C96,277,192,235,288,224C384,213,480,235,576,261.3C672,288,768,320,864,314.7C960,309,1056,267,1152,250.7C1248,235,1344,245,1392,250.7L1440,256L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z"/>
          </svg>
          <svg className="absolute -top-10 left-0 w-full h-full opacity-8" preserveAspectRatio="none" viewBox="0 0 1440 560" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,165.3C672,160,768,192,864,208C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z"/>
          </svg>
        </div>
        
        <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-10 mb-4 sm:mb-8 lg:mb-12 relative z-10 gap-y-8" style={{ maxWidth: '95%' }}>
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 xl:gap-32">
            {/* Left Section */}
            <section className="w-full lg:w-auto">
              <h1 id="events-section-2" className="text-2xl sm:text-3xl font-bold mb-1 scroll-mt-32 sm:scroll-mt-40 lg:scroll-mt-48">Events Registration/</h1>
              <h1 id="event-toc-ref" className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Attendance Tracking</h1>

              {/* Select Date */}
              <div className="mb-4 max-w-full sm:max-w-xs">
                <label className="block text-lg sm:text-xl font-bold mb-2">
                  Select Date
                </label>
                <Calendar date={selectedDate2} onDateChange={setSelectedDate2} />
              </div>

              {/* Select Event */}
              <div>
                <div className="flex items-center mb-2 gap-2">
                  <label className="block text-lg sm:text-xl font-bold">
                    Select Event
                  </label>
                  <button className="px-3 py-1.5 text-sm text-black hover:underline ml-2">
                    Next →
                  </button>
                </div>
                {/* Event Card with Radio Button */}
                <div className="flex items-center gap-3">
                  {/* Event Card */}
                  <div className="p-3 bg-white flex-1 rounded-md shadow-sm">
                    <div className="flex gap-3">
                      <div className="flex flex-col gap-2 flex-1">
                        <div>
                          <p className="text-xs text-gray-600">Event Name</p>
                          <p className="text-sm font-bold">Tech Summit 2026</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Location</p>
                          <p className="text-sm">Convention Center</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Date & Time</p>
                          <p className="text-sm">Jan 29, 2026 • 2:00 PM</p>
                        </div>
                      </div>
                      <Image
                        src={ducks}
                        alt="Event"
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover shrink-0 rounded"
                      />
                    </div>
                  </div>
                  {/* Radio Button Outside */}
                  <input
                    type="radio"
                    id="attending"
                    name="event-selection"
                    checked={isAttending}
                    onChange={() => setIsAttending(!isAttending)}
                    className="w-4 h-4 shrink-0 cursor-pointer"
                    style={{ accentColor: isAttending ? '#f3b927' : 'inherit' }}
                  />
                </div>
              </div>
            </section>

            {/* Right Section */}
            <section className="flex flex-col justify-center flex-1 w-full max-w-full sm:max-w-lg mx-auto">
              {/* Selected Event Display */}
              <p className="text-xs sm:text-sm text-gray-700 mb-2">Selected Event: Tech Summit 2026</p>

              {/* Registration Form Card */}
              <div className="p-4 sm:p-5 lg:p-6 bg-white rounded-md shadow-sm w-full">
                <h3 className="text-lg mb-4 font-bold">Registration Form</h3>

                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit} noValidate>
                  <div>
                    <label className="block text-sm mb-1.5 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleFormChange}
                      onBlur={handleFormBlur}
                      className={`w-full px-3 py-2 rounded-md bg-gray-100 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${formErrors.name && formTouched.name ? 'ring-2 ring-red-400' : ''}`}
                      aria-invalid={!!formErrors.name}
                      aria-describedby="name-error"
                    />
                    {formErrors.name && formTouched.name && (
                      <p className="text-xs text-red-500 mt-1" id="name-error">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(123) 456-7890"
                      value={form.phone}
                      onChange={handleFormChange}
                      onBlur={handleFormBlur}
                      className={`w-full px-3 py-2 rounded-md bg-gray-100 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${formErrors.phone && formTouched.phone ? 'ring-2 ring-red-400' : ''}`}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby="phone-error"
                    />
                    {formErrors.phone && formTouched.phone && (
                      <p className="text-xs text-red-500 mt-1" id="phone-error">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleFormChange}
                      onBlur={handleFormBlur}
                      className={`w-full px-3 py-2 rounded-md bg-gray-100 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${formErrors.email && formTouched.email ? 'ring-2 ring-red-400' : ''}`}
                      aria-invalid={!!formErrors.email}
                      aria-describedby="email-error"
                    />
                    {formErrors.email && formTouched.email && (
                      <p className="text-xs text-red-500 mt-1" id="email-error">{formErrors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 mt-2 text-sm font-bold rounded-md bg-[#f3b927] text-white transition-colors hover:bg-black hover:text-white"
                  >
                    Register
                  </button>
                  {formSuccess && (
                    <p className="text-green-600 text-sm text-center mt-2">Registration successful!</p>
                  )}
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
      
      {/* Virtual and Onsite Events */}
      <section id="virtual-onsite-section" className="max-w-7xl mx-auto mt-16 sm:mt-24 lg:mt-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            className="rounded-full"
            style={{
              width: '520px',
              height: '520px',
              background: 'radial-gradient(circle, #EED45E 0%, rgba(238,212,94,0.8) 55%, rgba(238,212,94,0) 80%)',
              boxShadow: '0 0 200px 80px rgba(238,212,94,0.85)',
              opacity: 0.85,
              filter: 'blur(2px)'
            }}
          ></div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 lg:mb-12 relative z-10">Virtual & Onsite Events</h1>
        
        {/* 3 Cards Per Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12 relative z-10">
          {/* Card 1 */}
          <div className="overflow-hidden bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow group">
            <Image
              src={ducks}
              alt="Event"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 sm:p-6 flex flex-col gap-y-2">
              <h3 className="text-lg font-bold mb-3 transition-colors group-hover:text-[#f3b927]">Event Name</h3>
              <p className="text-gray-600 mb-4">Brief description of the event and what attendees can expect to experience.</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#f3b927]" /> Location</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-[#f3b927]" /> Jan 30, 2026</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow group">
            <Image
              src={ducks}
              alt="Event"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold mb-3 transition-colors group-hover:text-[#f3b927]">Virtual Webinar</h3>
              <p className="text-gray-600 mb-4">Join us online for an engaging discussion about industry trends and insights.</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#f3b927]" /> Online</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-[#f3b927]" /> Feb 5, 2026</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow group">
            <Image
              src={ducks}
              alt="Event"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold mb-3 transition-colors group-hover:text-[#f3b927]">Workshop Session</h3>
              <p className="text-gray-600 mb-4">Hands-on learning experience with expert instructors in a collaborative environment.</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#f3b927]" /> Conference Hall</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-[#f3b927]" /> Feb 10, 2026</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="overflow-hidden bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow group">
            <Image
              src={ducks}
              alt="Event"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold mb-3 transition-colors group-hover:text-[#f3b927]">Networking Mixer</h3>
              <p className="text-gray-600 mb-4">Connect with professionals and expand your network in a casual, friendly setting.</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#f3b927]" /> Rooftop Lounge</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-[#f3b927]" /> Feb 15, 2026</span>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="overflow-hidden bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow group">
            <Image
              src={ducks}
              alt="Event"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold mb-3 transition-colors group-hover:text-[#f3b927]">Training Program</h3>
              <p className="text-gray-600 mb-4">Comprehensive training program designed to enhance your professional skills and knowledge.</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#f3b927]" /> Training Center</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-[#f3b927]" /> Feb 20, 2026</span>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="overflow-hidden bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow group">
            <Image
              src={ducks}
              alt="Event"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold mb-3 transition-colors group-hover:text-[#f3b927]">Product Launch</h3>
              <p className="text-gray-600 mb-4">Be the first to see our latest innovation and learn about exciting new features.</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#f3b927]" /> Grand Ballroom</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-[#f3b927]" /> Feb 25, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Turner */}
        <div className="flex items-center justify-center gap-4 relative z-10">
          <button className="text-gray-600 hover:text-black">←</button>
          <span className="text-gray-600">1 of 3</span>
          <button className="text-gray-600 hover:text-black">→</button>
        </div>
      </section>

      {/* Event Feedback Form Section */}
      <section id="feedback-section" className="w-full py-12 lg:py-16 mt-16 sm:mt-24 lg:mt-50 relative overflow-hidden" style={{ backgroundColor: '#E8C32C' }}>
        {/* Background SVG */}
        <div className="absolute minset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="980"
            height="582"
            viewBox="0 0 1542 915"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-40 max-w-screen-lg w-full"
          >
            <g opacity="0.48">
              <g filter="url(#filter0_di_860_9713)">
                <path d="M223.171 634.12C240.932 663.234 287.319 655.536 310.808 680.285C338.452 709.601 322.059 769.665 357.753 787.691C368.505 792.62 380.984 792.015 391.736 796.944C421.306 810.498 421.44 857.498 449.221 875.226C477.66 892.923 514.09 868.675 547.111 871.162C572.191 872.672 600.538 888.329 619.54 871.739C634.753 858.739 634.786 830.125 654.245 823.732C686.687 813.303 702.368 884.074 734.154 873.677C747.137 869.642 752.377 854.4 763.894 847.029C787.554 831.576 817.733 858.726 845.104 852.63C879.669 845.505 899.529 789.361 932.947 800.685C946.983 805.455 954.909 820.739 965.845 829.747C993.183 852.265 1034.01 838.024 1061.34 816.262C1073.42 806.82 1088.07 795.891 1101.51 802.052C1108.92 805.781 1113.25 814.427 1118.81 820.97C1141.17 849.861 1192.34 846.018 1211.33 814.441C1220.48 798.329 1222.22 778.489 1234.09 764.288C1250.34 745.107 1279.3 745.066 1303.63 744.567C1328.62 744.037 1357.99 738.526 1368.12 714.873C1373.45 701.67 1371.4 685.42 1378.77 673.481C1390.45 655.202 1419.47 656.521 1433.16 638.826C1445 623.946 1440.05 601.705 1444.45 582.416C1452.72 546.591 1493.99 527.559 1502.91 491.701C1509.07 467.559 1498.68 441.494 1503.49 416.735C1506.2 403.66 1512.9 391.754 1516.3 379.327C1525.97 345.477 1511.18 309.406 1497.9 277.35C1478.06 231.305 1458.91 185.909 1439.07 139.864C1427.35 113.182 1414.18 83.8454 1387.36 72.8829C1377.3 68.602 1366.04 67.1039 1357.17 60.0402C1350.32 54.2407 1346.64 45.5627 1341.71 38.308C1316.36 1.38682 1260.65 6.812 1220.7 25.7801C1152.36 57.7051 1096.41 116.28 1067.34 187.176C1043.57 244.191 1037.18 307.176 1010.69 362.279C997.431 389.49 980.108 414.174 961.381 436.881C915.846 492.907 862.064 541.158 801.913 579.499C744.955 615.641 609.069 535.709 564.671 499.711C512.743 457.265 511.263 438.943 468.56 396.732C419.642 348.009 383.334 374.975 328.332 396.035C290.818 410.797 229.511 394.013 200.962 417.878C155.948 456.166 210.367 480.778 224.905 511.411C243.903 553.409 201.103 597.04 223.171 634.12Z" fill="url(#paint0_linear_860_9713)"/>
                <path d="M1514.85 378.92C1519.59 362.332 1518.36 345.133 1514.25 328.022C1510.13 310.906 1503.17 293.987 1496.52 277.948L1496.52 277.948C1489.08 260.679 1481.74 243.501 1474.42 226.347L1459.79 192.053C1452.48 174.904 1445.14 157.733 1437.7 140.472L1437.7 140.472C1431.83 127.113 1425.66 113.231 1417.63 101.32C1409.62 89.4243 1399.83 79.6027 1386.79 74.2719L1386.78 74.2675L1386.77 74.2641C1381.79 72.1473 1376.64 70.7631 1371.32 68.9228C1366.09 67.1116 1360.86 64.9052 1356.23 61.2158L1356.21 61.201L1356.19 61.1862C1352.6 58.1394 1349.87 54.3681 1347.45 50.5218C1344.97 46.5789 1342.94 42.7813 1340.47 39.1552C1328.14 21.2027 1308.39 13.4595 1286.61 12.5842C1264.82 11.7082 1241.14 17.7313 1221.34 27.1347L1221.33 27.139C1153.33 58.9031 1097.65 117.194 1068.72 187.742L1068.72 187.75C1056.88 216.141 1049.37 246.027 1041.48 275.824C1033.61 305.579 1025.36 335.229 1012.04 362.925L1012.04 362.932C998.712 390.279 981.317 415.061 962.544 437.825C916.91 493.973 863.007 542.333 802.716 580.763L802.713 580.765C788.038 590.077 768.442 591.823 746.847 588.828C725.223 585.829 701.374 578.047 677.988 568.037C631.22 548.017 586.03 518.963 563.724 500.877L563.72 500.874C537.66 479.573 524.237 464.303 511.987 449.077C499.76 433.88 488.78 418.831 467.504 397.8L467.5 397.797C455.383 385.728 444.122 378.422 433.236 374.519C422.363 370.621 411.774 370.087 400.943 371.699C390.085 373.314 378.991 377.085 367.117 381.802C355.346 386.478 342.584 392.182 328.877 397.431C319.294 401.202 308.255 402.936 296.727 403.816C285.209 404.695 273.062 404.728 261.32 405.042C249.536 405.358 238.13 405.958 227.913 407.945C217.698 409.933 208.789 413.287 201.922 419.027C190.835 428.46 186.095 436.861 185.157 444.515C184.218 452.177 187.045 459.436 191.852 466.683C196.673 473.952 203.328 480.987 209.82 488.256C216.255 495.46 222.522 502.887 226.261 510.763L226.271 510.788L226.718 511.8C235.836 533.043 229.786 554.635 224.335 574.993C218.823 595.579 213.954 614.826 223.971 632.508L224.46 633.349C233 647.335 248.447 652.572 265.26 657.398C281.859 662.162 299.81 666.514 311.897 679.25L311.902 679.253L312.562 679.969C319.303 687.417 323.377 696.643 326.227 706.478C329.163 716.609 330.839 727.543 332.737 737.947C336.575 758.984 341.332 777.706 358.418 786.344C363.588 788.706 369.199 789.757 375.024 790.842C380.801 791.917 386.793 793.025 392.365 795.579C407.732 802.623 415.353 818.322 422.512 833.889C429.774 849.68 436.584 865.373 450.02 873.953C463.698 882.463 479.382 880.963 496.144 877.43C504.388 875.692 513.137 873.404 521.604 871.764C530.162 870.107 538.781 869.03 547.229 869.667C553.616 870.053 560.179 871.335 566.663 872.757C573.191 874.188 579.605 875.75 585.848 876.756C598.337 878.768 609.583 878.445 618.556 870.611L618.561 870.605L618.568 870.6C622.168 867.524 624.917 863.483 627.32 858.953C629.738 854.397 631.731 849.504 633.934 844.643C638.264 835.093 643.363 825.73 653.781 822.307L653.791 822.304C662.526 819.496 670.095 822.218 676.862 827.406C683.567 832.547 689.679 840.253 695.622 847.758C701.631 855.347 707.469 862.731 713.744 867.607C719.958 872.436 726.384 874.642 733.693 872.251L733.714 872.244C739.745 870.369 744.056 865.876 748.424 860.645C752.706 855.517 757.081 849.612 763.088 845.767L763.089 845.768C775.561 837.63 789.672 840.806 803.535 844.882C810.563 846.948 817.534 849.254 824.501 850.684C831.443 852.109 838.228 852.626 844.783 851.167L844.806 851.161C853.096 849.453 860.591 844.785 867.749 838.769C874.926 832.737 881.606 825.495 888.395 818.682C895.127 811.926 901.962 805.598 909.283 801.699C916.67 797.764 924.609 796.274 933.433 799.264L933.434 799.264L934.122 799.507C941.18 802.104 946.687 807.202 951.664 812.608C956.889 818.284 961.437 824.17 966.8 828.587C980.024 839.479 996.563 841.544 1013.3 838.139C1030.06 834.731 1046.88 825.858 1060.41 815.089L1060.42 815.081C1066.44 810.373 1073.26 805.169 1080.29 801.942C1087.35 798.706 1094.86 797.353 1102.14 800.688L1102.16 800.699L1102.19 800.712L1102.56 800.904C1106.38 802.933 1109.38 806.141 1112.03 809.527C1113.41 811.276 1114.73 813.118 1116.02 814.891C1117.32 816.677 1118.61 818.406 1119.96 819.996L1119.98 820.021L1120 820.049L1120.51 820.698C1131.37 834.207 1148.93 840.134 1166.23 838.885C1183.8 837.617 1200.84 828.963 1210.04 813.681C1214.52 805.783 1217.18 796.986 1220.27 788.157C1223.34 779.393 1226.81 770.654 1232.94 763.328L1232.94 763.321C1241.37 753.373 1253.05 748.458 1265.54 745.951C1278.01 743.449 1291.48 743.316 1303.6 743.068C1316.02 742.804 1329.42 741.302 1340.92 736.987C1352.4 732.682 1361.88 725.629 1366.73 714.309C1369.31 707.918 1370.11 700.784 1371.2 693.486C1372.27 686.287 1373.63 678.957 1377.49 672.697L1377.5 672.686L1377.5 672.676C1383.65 663.064 1394.32 658.676 1404.66 654.541C1415.19 650.334 1425.43 646.371 1431.97 637.911L1431.99 637.894C1437.61 630.826 1439.31 621.936 1440.1 612.159C1440.88 602.526 1440.76 591.87 1442.99 582.088L1442.99 582.084C1447.22 563.724 1459.91 549.727 1472.33 536.064C1484.85 522.286 1497.1 508.84 1501.45 491.344L1501.46 491.336C1504.46 479.557 1503.44 467.26 1502.21 454.6C1500.99 442.031 1499.57 429.09 1502.02 416.454L1502.02 416.445L1502.03 416.436C1503.41 409.759 1505.8 403.407 1508.24 397.241C1510.7 391.038 1513.18 385.05 1514.85 378.937L1514.85 378.928L1514.85 378.92Z" stroke="#F5F5F5" strokeWidth="3"/>
              </g>
            </g>
            <defs>
              <filter id="filter0_di_860_9713" x="161.479" y="0" width="1379.93" height="914.739" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="11"/>
                <feGaussianBlur stdDeviation="11"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.31 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_860_9713"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_860_9713" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="14"/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_860_9713"/>
              </filter>
              <linearGradient id="paint0_linear_860_9713" x1="1357.55" y1="176.582" x2="414.587" y2="669.188" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F3F1F1"/>
                <stop offset="1" stopColor="#DAB619"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mx-auto px-4 sm:px-6 flex justify-center relative z-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Event Feedback Forms</h1>

            {/* Select Event Dropdown */}
            <div className="mb-6">
              <select className="w-full px-5 py-4 bg-white text-gray-700 text-lg font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Select an Event</option>
                <option>Event Name - Jan 30, 2026</option>
                <option>Virtual Webinar - Feb 5, 2026</option>
                <option>Workshop Session - Feb 10, 2026</option>
                <option>Networking Mixer - Feb 15, 2026</option>
                <option>Training Program - Feb 20, 2026</option>
              </select>
            </div>

            {/* Feedback Form */}
            <div className="bg-white p-5 mb-4 rounded-md shadow-sm">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Rating</label>
                <select className="w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-100">
                  <option>Select a Rating</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Poor</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Feedback</label>
                <textarea
                  placeholder="Please share your feedback..."
                  rows={4}
                  className="w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-100 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full px-4 py-2.5 text-sm text-white font-semibold rounded-md bg-black transition-colors hover:bg-[#f3b927]">
              Submit Feedback
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
