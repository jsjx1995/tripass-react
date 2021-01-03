import { Text } from '@adobe/react-spectrum'
import { Businesshours } from 'interfaces/facility.dto'
import React from 'react'

export type DayType = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export type GetDayType = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const days = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat'
}

type ShowCurrentDayBusinessHoursProps = {
  businessHours: Businesshours
}

const ShowCurrentDayBusinessHours: React.VFC<ShowCurrentDayBusinessHoursProps> = ({ businessHours }) => {
  const accessByBracket = <S, T extends keyof S>(obj: S, key: T) => {
    return obj[key];
  };

  const ShowBusinessHours = ({ d }: { d: Date }) => {
    const dayNumber = d.getDay() as GetDayType
    const day = accessByBracket(days, dayNumber) as DayType
    const bh = {
      open: businessHours.open[day],
      close: businessHours.close[day]
    }
    return (
      <React.Fragment>
        {bh.open && bh.close ?
          <Text>{bh.open} ~ {bh.close}</Text>
          :
          <Text>営業時間情報なし</Text>
        }
      </React.Fragment>
    )
  }

  return (
    <ShowBusinessHours d={new Date()} />
  )
}

export default ShowCurrentDayBusinessHours