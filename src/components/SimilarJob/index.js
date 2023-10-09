import {AiOutlineStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const SimilarJob = props => {
  const {data} = props
  return (
    <li className="simlar-job-container">
      <div className="logo-title-align">
        <img
          alt="similar job company logo"
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
      <h3>Description</h3>
      <p>{data.job_description}</p>
      <div className="job-location-align">
        <p className="location">
          <ImLocation /> {data.location}
        </p>
        <p>
          <FaSuitcase />
          {data.employment_type}
        </p>
      </div>
    </li>
  )
}

export default SimilarJob
