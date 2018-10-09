
export const getSchedule = async (url) => {
  try {
  const response = await fetch(url)
      return await response.json()
    } catch(error){
      Alert.alert(error, 'error')
    }
}
