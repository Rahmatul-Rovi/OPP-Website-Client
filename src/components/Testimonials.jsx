import React from 'react';
import { HiStar } from 'react-icons/hi';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Tanvir Ahmed",
      comment: "The quality of the fabric is exceptional. One Point Plus has become my go-to brand for office wear.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sabbir Hossain",
      comment: "Great fitting and minimalist design. Exactly what I was looking for. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Arifur Rahman",
      comment: "Visited their Dhanmondi showroom. The collection is premium and the staff behavior is very professional.",
      rating: 4,
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[5px] uppercase text-gray-400 mb-3">Testimonials</h2>
          <p className="text-3xl font-black uppercase tracking-tighter">What Our Customers Say</p>
          <div className="h-1 w-12 bg-black mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              {/* Star Rating */}
              <div className="flex text-yellow-500 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <HiStar key={i} className="text-lg" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 italic text-sm leading-relaxed mb-6">
                "{review.comment}"
              </p>

              {/* Divider */}
              <div className="w-8 h-[1px] bg-gray-200 mb-4"></div>

              {/* Name */}
              <h4 className="text-xs font-black uppercase tracking-widest text-black">
                {review.name}
              </h4>
              <p className="text-[10px] text-gray-400 uppercase mt-1">Verified Buyer</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;