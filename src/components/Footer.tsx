import React from 'react'

export const Footer: React.FC = () => {
    return (
        <footer className="py-3 border-top bg-dark">
            <div className="container">
                <div className="row align-items-center text-center text-md-start">

                    <div className="col-md-4 mb-2 mb-md-0">
                        <a
                            href="/"
                            className="text-light text-decoration-none"
                            aria-label="Home"
                        >
                            <i className="bi bi-bootstrap-fill fs-4"></i>
                        </a>
                    </div>

                    <div className="col-md-4 mb-2 mb-md-0 text-center">
                        <span className="text-light">
                            © {new Date().getFullYear()} Company, Inc
                        </span>
                    </div>

                    <div className="col-md-4">
                        <ul className="nav justify-content-md-end justify-content-center list-unstyled d-flex mb-0">
                            <li className="ms-3">
                                <a className="text-light" href="https://instagram.com" aria-label="Instagram">
                                    <i className="bi bi-instagram fs-5"></i>
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="text-light" href="https://facebook.com" aria-label="Facebook">
                                    <i className="bi bi-facebook fs-5"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    )
}
