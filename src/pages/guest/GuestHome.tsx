const GuestHome = () => {
  return (
    <main>
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">
            Delicious food, delivered fast
          </h1>
          <p className="lead mt-3">
            Order from top restaurants around you and enjoy fresh food at home.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <a href="/login" className="btn btn-light btn-lg fw-bold">
              Login
            </a>
            <a href="/register" className="btn btn-outline-light btn-lg fw-bold">
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section
        className="py-5 bg-light"
        style={{
          background: "linear-gradient(135deg, #000000, #5c47ff, #bcbcfc, #ffffff, #bcbcfc, #5c47ff, #000000)",
        }}
      >
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                  className="card-img-top"
                  alt="Fast delivery"
                  style={{
                    height: "500px",
                    objectFit: "cover"
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-light">Fast Delivery</h5>
                  <p className="card-text text-secondary">
                    Get your favorite meals delivered hot and fresh in no time.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
                  className="card-img-top"
                  alt="Top restaurants"
                  style={{
                    height: "500px",
                    objectFit: "cover"
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-light">Top Restaurants</h5>
                  <p className="card-text text-secondary">
                    Choose from a wide range of popular and trusted restaurants.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark">
                <img
                  src="https://images.unsplash.com/photo-1521305916504-4a1121188589"
                  className="card-img-top"
                  alt="Easy ordering"
                  style={{
                    height: "500px",
                    objectFit: "cover"
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-light">Easy Ordering</h5>
                  <p className="card-text text-secondary">
                    Simple, secure, and smooth ordering experience for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to order?</h2>
          <p className="mt-3">
            Join now and discover amazing food near you.
          </p>
          <a href="/register" className="btn btn-light btn-lg fw-bold mt-2">
            Create Account
          </a>
        </div>
      </section>
    </main>
  );
};

export default GuestHome;
