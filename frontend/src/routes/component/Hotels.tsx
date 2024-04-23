
async function getHotelList(): Promise<string> {
    try {
        const hotelList = "hotels" //здесь будет await _somefuction() - для получения списка отелей из бд? + пока просто <string>
        return hotelList
    }
    catch (e) { 
        return (e as Error).message
    }
}

export default function Hotels() {
    let listOfHotels
    getHotelList().then(result => listOfHotels = result)
    return (
    <>
        <div style={{ margin: 10 }}>Здесь будет список отелей - {listOfHotels}</div>  
    </>
  )
}