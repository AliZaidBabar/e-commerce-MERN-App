import React, { useState, useEffect } from 'react';
import '../style.css'
import { Link } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop === 0 && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'bg-white-scrolled' : 'bg-transparent'}`}>
      <div className="container-fluid">

        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start flex-grow-1 pe-5 ps-5 pt-3">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Shop
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Explore
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Search</a>
              </li>
            </ul>
            <a className="navbar-brand d-none d-md-block pt-4" href="#" style={{ color: 'black', fontSize: '24px' }}>HEALTH & BEAUTY</a>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 pe-5 ps-5 pt-3">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Get 15% Off</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to='./SignUp' >Sign in</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><Link style={{ color: 'black', textDecoration: 'none' }} to='/UnderDevelopment'>Bag(0)</Link></a>
              </li>
            </ul>
            {/* <form className="d-flex mt-3" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;