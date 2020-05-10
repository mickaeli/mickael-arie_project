
export const getDateAndTime = (date_object) => {

  const minutes = date_object.getMinutes()



  var date_and_time = date_object.getDate() + " "
                + (date_object.toLocaleString('en', { month: 'long' }))  + " " 
                + date_object.getFullYear() + ", "  
                + date_object.getHours() + ":"  
                + (minutes < 10 ? '0' : '') + minutes



  // const date_and_time = new Intl.DateTimeFormat("en-GB", {
  //   year: "numeric", month: "long", day: "2-digit",
  //   hour: 'numeric', minute: 'numeric',
  //   hour12: false,
  // }).format(date_object)

  return date_and_time
}