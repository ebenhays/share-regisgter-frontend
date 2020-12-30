import Head from "next/head";
import Link from "next/link";
export default function Layout(props) {
  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link href="#">
          <a className="navbar-brand">Share Register</a>
        </Link>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0"
          id="sidebarToggle"
          href="#"
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <div className="input-group"></div>
        </form>
        <ul className="navbar-nav ml-auto ml-md-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="userDropdown"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <Link href="#">
                <a className="dropdown-item">Profile</a>
              </Link>
              <div className="dropdown-divider"></div>
              <Link href="#">
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Stats</div>
                <Link href="/dashboard">
                  <a className="nav-link">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    Dashboard
                  </a>
                </Link>

                <div className="sb-sidenav-menu-heading">Screen</div>
                <Link href="#">
                  <a
                    className="nav-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-columns"></i>
                    </div>
                    Customer Records
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                </Link>

                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link href="/customer/create">
                      <a className="nav-link">Create Customer</a>
                    </Link>
                    <Link href="/customer/authorize">
                      <a className="nav-link">Authorize Customer</a>
                    </Link>
                    <Link href="/customer/search">
                      <a className="nav-link">Search Customer</a>
                    </Link>
                  </nav>
                </div>
                <Link href="#">
                  <a
                    className="nav-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-book-open"></i>
                    </div>
                    Shares
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                </Link>

                <div
                  className="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <Link href="#">
                      <a
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#pagesCollapseAuth"
                        aria-expanded="false"
                        aria-controls="pagesCollapseAuth"
                      >
                        Account
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </a>
                    </Link>

                    <div
                      className="collapse"
                      id="pagesCollapseAuth"
                      aria-labelledby="headingOne"
                      data-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <Link href="/register/createAccount">
                          <a className="nav-link">Create Account</a>
                        </Link>
                        <Link href="/register/authorizeAccount">
                          <a className="nav-link">Authorize Share Account</a>
                        </Link>
                        <Link href="/register/searchAccount">
                          <a className="nav-link">Search Account</a>
                        </Link>
                        <Link href="/register/createShareRecord">
                          <a className="nav-link">Buy Shares</a>
                        </Link>
                        <Link href="/register/authorizeShareRecord">
                          <a className="nav-link">Authorize Share Record</a>
                        </Link>
                        <Link href="/register/searchStmt">
                          <a className="nav-link">Statement of Account</a>
                        </Link>
                      </nav>
                    </div>
                    <Link href="#">
                      <a
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#pagesCollapseError"
                        aria-expanded="false"
                        aria-controls="pagesCollapseError"
                      >
                        Reports
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </a>
                    </Link>
                    <div
                      className="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingOne"
                      data-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <Link href="/report/Reporting">
                          <a className="nav-link">Shares</a>
                        </Link>
                      </nav>
                    </div>
                  </nav>
                </div>
                <div className="sb-sidenav-menu-heading">Admin</div>
                <Link href="#">
                  <a
                    className="nav-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseLayouts2"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-columns"></i>
                    </div>
                    Setup
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts2"
                  aria-labelledby="headingOne"
                  data-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link href="#">
                      <a className="nav-link">Create Profile</a>
                    </Link>
                    <Link href="#">
                      <a className="nav-link">Authorize Profile</a>
                    </Link>
                    <Link href="#">
                      <a className="nav-link">Search Profile</a>
                    </Link>
                    <Link href="/register/sharePrice">
                      <a className="nav-link">Share price</a>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <div className="container-fluid">
            <h1 className="mt-4">{props.heading}</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">{props.title}</li>
            </ol>
            {props.children}
          </div>

          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Share Register Software @{" "}
                  {new Date().getFullYear()}
                </div>
                <div>
                  <a href="https://www.travissystemsgh.com" target="_blank">
                    Travis Systems Limited
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      ;
    </div>
  );
}
