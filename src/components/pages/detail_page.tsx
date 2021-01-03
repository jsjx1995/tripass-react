import { Facility } from 'interfaces/facility.dto'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from 'redux/rootReducers'
import { fetchFacility } from 'redux/facilitySlice'

interface DetailPageProps {
  // name: string;
}

const DetailPage: React.FC<DetailPageProps> = () => {
  const { search } = useLocation()

  const [facility, setFacility] = React.useState<Facility>()
  const dispatch = useDispatch()

  const facilities = useSelector((state: RootState) => state.facilities.facilities)

  // const fetchFacilities = (id:number) => {
  //   if(!facilities) {
  //     dispatch(fetchFacility(id))
  //   }
  // }

  React.useEffect(() => {
    let urlParamStr = decodeURIComponent(search)
    if (urlParamStr) {
      urlParamStr = urlParamStr.substring(1) //?を除去
      const params: { id: number } = urlParamStr.split('&').reduce((prev: any, current: string) => {
        const temp = current.split('=')
        prev[temp[0]] = temp[1]
        return prev
      }, {})
      // console.log(params)
      if (facilities.length === 0) {
        console.log(params.id)
        dispatch(fetchFacility(params.id))
      }
      const selectedFacility = facilities.find(f => f.id === Number(params.id))
      setFacility(selectedFacility)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, facilities])

  return (
    <div>
      <h1>About</h1>
      {facility &&
        <h2>I am {facility.title}</h2>
      }
    </div>
  )
}

export default DetailPage