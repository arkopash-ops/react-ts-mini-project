const AboutUs = () => {
    return (
        <main>
            <section
                className="bg-light py-5"
                style={{
                    background: "linear-gradient(180deg, #000000, #5c47ff, #bcbcfc, #5c47ff, #000000)",
                }}>
                <div className="container text-center">
                    <h1 className="fw-bold text-dark">About Bon Appétit</h1>
                    <p className="text-muted mt-3">
                        Connecting hungry customers with amazing restaurants
                    </p>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-md-6">
                            <img
                                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                                alt="Delicious food prepared by restaurant"
                                className="img-fluid rounded"
                                loading="lazy"
                            />
                        </div>

                        <div className="col-md-6">
                            <h2 className="fw-bold mb-3">How It Works</h2>
                            <p className="text-secondary">
                                FoodieHub is a food ordering platform where restaurant owners
                                can list menus and customers can order food effortlessly.
                            </p>

                            <ul className="list-unstyled mt-4">
                                <li className="mb-2">
                                    <strong>Restaurant Owners:</strong> Add menus, manage items & pricing
                                </li>
                                <li className="mb-2">
                                    <strong>Customers:</strong> Browse food & track delivery in real time
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-dark text-white py-5">
                <div className="container text-center">
                    <h2 className="fw-bold">Our Mission</h2>
                    <p className="mt-3">
                        To make food ordering fast, simple, and enjoyable for everyone.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
