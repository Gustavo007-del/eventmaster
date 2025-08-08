export function Stats() {
  const stats = [
    { number: '5000+', label: 'Events Completed' },
    { number: '3500+', label: 'Happy Clients' },
    { number: '12', label: 'Cities' },
    { number: '99.2%', label: 'Satisfaction' }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
