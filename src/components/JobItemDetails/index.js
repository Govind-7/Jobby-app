import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {FaSuitcase} from 'react-icons/fa'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import SimilarJob from '../SimilarJob'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    status: apiStatus.loading,
    data: '',
    skill: [],
    companyLife: '',
    similarJobs: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      // console.log(jsonData)
      this.setState({
        data: jsonData.job_details,
        skill: jsonData.job_details.skills,
        companyLife: jsonData.job_details.life_at_company,
        similarJobs: jsonData.similar_jobs,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }

    // console.log(token)
  }

  loaderView = () => (
    <div>
      <Header />
      <div className="job-details-bg-loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  retryJobsFun = () => {
    this.setState({status: apiStatus.loading}, this.getData)
  }

  render() {
    const {data, skill, companyLife, status, similarJobs} = this.state
    // const {skills} = data
    // console.log(similarJobs)
    if (status === 'SUCCESS') {
      return (
        <div>
          <Header />
          <div className="job-details-bg">
            <div className="jabcard-bg">
              <div className="website-link-align">
                <div className="logo-title-align">
                  <img
                    alt="job details company logo"
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
                <a
                  className="special-website-link"
                  href={data.company_website_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit <BsBoxArrowUpRight />
                </a>
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
                <p>{data.package_per_annum}</p>
              </div>
              <hr />
              <h3>Description</h3>
              <p>{data.job_description}</p>
              <h3>Skills</h3>
              <ul className="skill-container">
                {skill.map(item => (
                  <li key={item.name} className="skill-img-align">
                    <img
                      className="skill-img"
                      src={item.image_url}
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
              <div>
                <h3>Life at Company</h3>
                <div className="company-life">
                  <p>{companyLife.description}</p>
                  <img alt="life at company" src={companyLife.image_url} />
                </div>
              </div>
            </div>
            <h1>Similar jobs</h1>
            <ul className="similar-jobs-cont-align">
              {similarJobs.map(item => (
                <SimilarJob key={item.id} data={item} />
              ))}
            </ul>
          </div>
        </div>
      )
    }
    if (status === 'FAILURE') {
      return (
        <li>
          <img
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>

          <button onClick={this.retryJobsFun} type="button">
            Retry
          </button>
        </li>
      )
    }
    return this.loaderView()
  }
}

export default JobItemDetails
