import Services from '../../services/Services'

const getMonitorStats = async company_id => {
  const queryData = {
    access_token: '12345'
  }

  try {
    let response = await Services.getData(`api_get_monitors_stats`, queryData)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const getSocialMediaStats = async company_id => {
  const queryData = {
    access_token: '12345'
  }

  try {
    let response = await Services.getData(
      `api_get_social_media_stats`,
      queryData
    )
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const getFacebookStats = async company_id => {
  const queryData = {
    access_token: '12345'
  }

  try {
    let response = await Services.getData(`api_get_facebook_stats`, queryData)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const getInstagramStats = async company_id => {
  const queryData = {
    access_token: '12345'
  }
  try {
    let response = await Services.getData(`api_get_instagram_stats`, queryData)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  getMonitorStats,
  getSocialMediaStats,
  getFacebookStats,
  getInstagramStats
}
