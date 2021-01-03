import { Image } from '@adobe/react-spectrum'
import React from 'react'

type GetIconProps = {
  genre: string
}

const GetIcon: React.VFC<GetIconProps> = ({ genre }) => {

  const getIconAttributes = (): any => {
    const iconPath = ((genre: string): string | void => {
      switch (genre) {
        case "public": return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        case "sport": return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        case "shrinetemple": return "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        case "other": return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        case "transport": return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|0099cc|"
        case "leisure": return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|ffffff|"
        default: return "_assets/genre_icons/leisure.svg"
      }
    })
    return iconPath(genre)
  }

  return (
    <Image src={getIconAttributes()} alt={genre} />
  )

}

export default GetIcon