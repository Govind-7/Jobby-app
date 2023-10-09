import {Link} from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {FaSuitcase} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {data} = props
  const {id} = data
  //   console.log(id)

  return (
    <Link className="link-job-item" to={`/jobs/${id}`}>
      <li className="jabcard-bg">
        <div className="logo-title-align">
          <img
            alt="company logo"
            className="single-img"
            src={data.company_logo_url}
          />
          <div>
            <h1>{data.title}</h1>

            <p>
              <AiOutlineStar />
              {data.rating}
            </p>
          </div>
        </div>
        <div className="package-align">
          <div className="job-location-align">
            <p className="location">
              <ImLocation /> {data.location}
            </p>
            <p>
              <FaSuitcase />
              {data.employment_type}
            </p>
          </div>
          <h4>{data.package_per_annum}</h4>
        </div>
        <hr />
        <h3>Description</h3>
        <p>{data.job_description}</p>
      </li>
    </Link>
  )
}

export default JobCard
