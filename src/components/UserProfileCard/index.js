import './index.css'

const UserProfileCard = props => {
  const {data} = props
  //   console.log(data)

  return (
    <div className="profile-bg">
      <img src={data.profile_image_url} alt="profile" />
      <h1>{data.name}</h1>
      <p>{data.short_bio}</p>
    </div>
  )
}

export default UserProfileCard
