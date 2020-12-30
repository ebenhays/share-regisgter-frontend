import Layout from './index'
export default function Dashboard() {
    return (
      <Layout heading="DashBoard" title="Dashboard">
        <main>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">Share Price</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    Current Price
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">Total Shares In</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    Total in Cash
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">Total Shares Out</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    Total Paid Out
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body">Total Cancelled</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <a className="small text-white stretched-link" href="#">
                    Total Stopped
                  </a>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
}
