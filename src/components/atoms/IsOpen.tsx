import { Text, View } from '@adobe/react-spectrum'
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

type IsOpenProps = {
  businessHours: Businesshours
}

const IsOpen: React.VFC<IsOpenProps> = ({ businessHours }) => {

  const accessByBracket = <S, T extends keyof S>(obj: S, key: T) => {
    return obj[key];
  };

  const isOpen = (d: Date) => {
    const dayNumber = d.getDay() as GetDayType
    const h = String(d.getHours()).padStart(2, '0')
    const m = String(d.getMinutes()).padStart(2, '0')
    const time = h + m
    const day = accessByBracket(days, dayNumber) as DayType
    const currentDayBusinessHours = {
      open: businessHours.open[day],
      close: businessHours.close[day]
    }
    const s = currentDayBusinessHours.open
    const t = currentDayBusinessHours.close
    if (s === t) return s <= time && time <= t
    return (s <= time && time <= t) || (s <= time && time <= t)
  }

  const isExist = (d: Date) => {
    const dayNumber = d.getDay() as GetDayType
    const day = accessByBracket(days, dayNumber) as DayType
    const currentDayBusinessHours = {
      open: businessHours.open[day],
      close: businessHours.close[day]
    }
    return !currentDayBusinessHours.open
  }

  console.log()

  return (
    <View>
      {isOpen(new Date()) ?
        <Text>営業中</Text>
        :
        isExist(new Date()) || <Text>営業時間外</Text>
      }
    </View>
  )
}

export default IsOpen