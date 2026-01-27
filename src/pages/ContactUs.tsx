import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Contact Message:", formData);
  }

  return (
    <>
      {/* Hero */}
      <section className="py-5">
        <div className="container text-center">
          <h1 className="fw-bold text-light">Contact Us</h1>
          <p className="text-secondary mt-2">
            Have questions? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #1f1f1f, #f1f1f1)"
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm">
                <div className="card-body p-4">

                  <h4 className="fw-bold mb-3 text-center">
                    Send us a message
                  </h4>

                  <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message..."
                        required
                      />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-dark w-100">
                      Send Message
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
