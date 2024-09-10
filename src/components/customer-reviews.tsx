'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: "Tanya B.",
    rating: 5,
    comment: "Best soul food in town! The fried chicken is crispy perfection."
  },
  {
    id: 2,
    name: "Marcus W.",
    rating: 4,
    comment: "Authentic flavors that remind me of grandma's cooking. Yum!"
  },
  {
    id: 3,
    name: "Latisha J.",
    rating: 5,
    comment: "The mac and cheese is to die for. Will definitely be back!"
  },
  {
    id: 4,
    name: "Darnell T.",
    rating: 5,
    comment: "Collard greens and cornbread took me straight to flavor town!"
  },
  {
    id: 5,
    name: "Keisha M.",
    rating: 4,
    comment: "Love the atmosphere and the sweet potato pie is heavenly."
  },
  {
    id: 6,
    name: "Andre L.",
    rating: 5,
    comment: "The ribs fall off the bone. It's a taste of home away from home."
  },
  {
    id: 7,
    name: "Shanice R.",
    rating: 4,
    comment: "The gumbo is packed with flavor. It's like a party in my mouth!"
  },
  {
    id: 8,
    name: "Jerome P.",
    rating: 5,
    comment: "Best catfish I've ever had. Crispy outside, tender inside."
  }
]

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReviews = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % reviews.length)
  }

  const prevReviews = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 4 + reviews.length) % reviews.length)
  }

  return (
    <div className="w-full bg-zinc-900 text-zinc-300 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-400">Customer Reviews</h2>
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((offset) => {
              const review = reviews[(currentIndex + offset) % reviews.length]
              return (
                <div key={review.id} className="bg-zinc-800 rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold mr-2 text-zinc-100">{review.name}</h3>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-300">{review.comment}</p>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={prevReviews}
              className="bg-amber-600 text-zinc-900 px-4 py-2 rounded-full hover:bg-amber-500 transition-colors duration-200"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextReviews}
              className="bg-amber-600 text-zinc-900 px-4 py-2 rounded-full hover:bg-amber-500 transition-colors duration-200"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}