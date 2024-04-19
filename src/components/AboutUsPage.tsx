import RecruiterNavbar from '../pages/recruiter/components/RecruiterNavbar';

const AboutUsPage = () => {
  return (
    <>
    <RecruiterNavbar/>
    <div className="container mx-auto px-8 mt-16 flex justify-center items-center h-screen">
      <div className='w-2/3 bg-white py-10 rounded-2xl'>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">About Us</h1>
          
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Our Mission</p>
            <p className="">At Your Job Portal, our mission is to connect talented individuals with meaningful employment opportunities. We strive to empower job seekers and employers alike by providing a user-friendly platform for job search and recruitment.</p>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Our Team</p>
            <p className="">We are a dedicated team of professionals committed to facilitating the job search process. Our diverse backgrounds and expertise enable us to deliver innovative solutions and exceptional service to our users.</p>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Our Values</p>
            <p className="">Integrity, inclusivity, and excellence are at the core of everything we do. We believe in fostering a collaborative and supportive environment where individuals can thrive professionally and personally.</p>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Contact Us</p>
            <p className="">Have questions or feedback? We'd love to hear from you! Reach out to us via email at info@careercrafter.com or give us a call at +123-456-7890.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUsPage;
