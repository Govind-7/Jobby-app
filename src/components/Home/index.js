import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div className="home-bg">
      <h1 className="home-heading">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="home-para">
        Millions of people are searching for jobs,salery,information,compeny,
        <br />
        reviews.Find the job that fits your ability and potential
      </p>
      <Link to="/jobs">
        <button className="home-findjobs-but" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
