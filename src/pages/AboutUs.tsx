const AboutUs = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title mb-4 text-center">About Us</h1>

                            <p className="mb-4">
                                Our <strong>Food Ordering Admin Panel</strong> is designed to manage restaurants,
                                menus, users, and orders efficiently.
                            </p>

                            <h3 className="mb-3">What we offer</h3>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item">Role-based access (Admin, Owner, User)</li>
                                <li className="list-group-item">Restaurant & menu management</li>
                                <li className="list-group-item">Order tracking & analytics</li>
                                <li className="list-group-item">Scalable TypeScript-first architecture</li>
                            </ul>

                            <p>
                                This project is built using <strong>React + TypeScript</strong> and will
                                evolve into a full-stack application with Node.js, Express, and MongoDB.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;
