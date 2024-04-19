import RecruiterNavbar from '../pages/recruiter/components/RecruiterNavbar'

const ContactPage = () => {
  return (
    <>
    <RecruiterNavbar/>
      <div className="container mx-auto px-8 mt-24 flex flex-row h-screen justify-center items-center">
    <div className='w-2/3 bg-white pt-8 rounded-2xl  text-center'>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Reach Out to Us</p>
          <p className="text-gray-600">Have a question, suggestion, or need assistance? Don't hesitate to get in touch with us. We're here to help!</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Contact Information</p>
          <p className="text-gray-600">Feel free to reach out to us via email or phone:</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Email: info@careercrafter.com</li>
            <li>Phone: +123-456-7890</li>
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Visit Us</p>
          <p className="text-gray-600">You can also visit our office during business hours:</p>
          <p className="text-gray-600">123 Main Street, City, Country</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Send Us a Message</p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Your Name:</label>
              <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Your Email:</label>
              <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">Message:</label>
              <textarea id="message" name="message"  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-400 resize-none" required></textarea>
            </div>
            <div className="text-right">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default ContactPage
