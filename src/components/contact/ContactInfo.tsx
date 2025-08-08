import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
          <p className="text-gray-600">
            EventMaster Plaza<br />
            MG Road, Bangalore - 560001<br />
            Karnataka, India
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
          <p className="text-gray-600">
            +91 98765 43210<br />
            +91 98765 43211
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
          <p className="text-gray-600">
            hello@eventmaster.com<br />
            bookings@eventmaster.com
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Business Hours</h3>
          <p className="text-gray-600">
            Monday - Saturday: 9:00 AM - 8:00 PM<br />
            Sunday: 10:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </div>
  )
}
