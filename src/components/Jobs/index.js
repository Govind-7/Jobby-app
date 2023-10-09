import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import UserProfileCard from '../UserProfileCard'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  apiFailure: 'APIFAILURE',
}

const profileDetailsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class Jobs extends Component {
  state = {
    status: apiStatus.loading,
    profileDetails: '',
    serachInput: '',
    jobsData: [],
    employmentType: [],
    minimumPackage: '',
    searchInputFinal: '',
    profileStatus: profileDetailsStatus.loading,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')

    // console.log(token)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(profileUrl, options)
    if (response.ok) {
      const jsonData = await response.json()
      this.setState({
        profileDetails: jsonData.profile_details,
        profileStatus: profileDetailsStatus.success,
      })
    } else {
      this.setState({profileStatus: profileDetailsStatus.failure})
    }
  }

  getJobDetails = async () => {
    const {employmentType, minimumPackage, searchInputFinal} = this.state
    const employ = employmentType.join(',')
    // console.log(employ)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employ}&minimum_package=${minimumPackage}&search=${searchInputFinal}`
    // console.log(url)
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    // console.log(response)
    if (response.ok) {
      const jsonData = await response.json()
      if (jsonData.jobs.length !== 0) {
        //   console.log(jsonData.jobs.length)
        this.setState({jobsData: jsonData.jobs, status: apiStatus.success})
      } else {
        this.setState({status: apiStatus.failure})
      }
    } else {
      this.setState({status: apiStatus.apiFailure})
    }
  }

  employmentChange1 = event => {
    const {employmentType} = this.state
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getJobDetails,
      )
    } else if (!event.target.checked) {
      const index = employmentType.indexOf(event.target.value)
      employmentType.splice(index, 1)
      this.setState({employmentType}, this.getJobDetails)
    }

    // console.log(event.target.checked)
    // console.log(event.target.value)
  }

  saleryChange = event => {
    // console.log(event.target.value)
    this.setState({minimumPackage: event.target.value}, this.getJobDetails)
  }

  serachInputFun = event => {
    this.setState({serachInput: event.target.value})
    // console.log(event.target.value)
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {jobsData} = this.state
    // console.log(jobsData)
    return jobsData.map(item => <JobCard key={item.id} data={item} />)
  }

  failureView = () => (
    <li className="failureview-bg">
      <img
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </li>
  )

  retryJobsFunc = () => {
    this.setState({status: apiStatus.loading}, this.getJobDetails)
  }

  apiFailureView = () => (
    <li>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <button onClick={this.retryJobsFunc} type="button">
        Retry
      </button>
    </li>
  )

  aiDesider = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()

      case apiStatus.apiFailure:
        return this.apiFailureView()

      default:
        return null
    }
  }

  serachInputSetState = () => {
    const {serachInput} = this.state
    this.setState({searchInputFinal: serachInput}, this.getJobDetails)
  }

  profileStatusSuccessView = () => {
    const {profileDetails} = this.state
    return <UserProfileCard data={profileDetails} />
  }

  profileRetryFunc = () => {
    this.setState(
      {profileStatus: profileDetailsStatus.loading},
      this.getProfileDetails,
    )
  }

  profileStatusFailureView = () => (
    <div className="profile-failure">
      <button onClick={this.profileRetryFunc} type="button">
        Retry
      </button>
    </div>
  )

  profileStatusAiDesider = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case profileDetailsStatus.loading:
        return this.loadingView()

      case profileDetailsStatus.success:
        return this.profileStatusSuccessView()

      case profileDetailsStatus.failure:
        return this.profileStatusFailureView()

      default:
        return null
    }
  }

  render() {
    // const {profileDetails} = this.state
    // console.log(employmentType)
    return (
      <div>
        <Header />
        <div className="jobs-filter">
          <div className="filters">
            {this.profileStatusAiDesider()}
            <hr />
            <h1>Type of Employment</h1>
            <ul className="list-style">
              {employmentTypesList.map(item => (
                <li key={item.employmentTypeId}>
                  <input
                    value={item.employmentTypeId}
                    onChange={this.employmentChange1}
                    id={item.employmentTypeId}
                    type="checkbox"
                  />
                  <label htmlFor={item.employmentTypeId}>{item.label}</label>
                </li>
              ))}
            </ul>

            <hr />
            <h1>Salary Range</h1>
            <ul className="list-style">
              {salaryRangesList.map(item => (
                <li key={item.salaryRangeId}>
                  <input
                    name="same"
                    onChange={this.saleryChange}
                    value={item.salaryRangeId}
                    type="radio"
                    id={item.salaryRangeId}
                  />
                  <label htmlFor={item.salaryRangeId}>{item.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <input
              onChange={this.serachInputFun}
              type="search"
              placeholder="Search"
            />
            <button
              onClick={this.serachInputSetState}
              type="button"
              data-testid="searchButton"
            >
              <BsSearch />
            </button>
            <ul>{this.aiDesider()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
