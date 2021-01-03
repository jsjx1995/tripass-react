import React from 'react'
import { Businesshours, Facility } from 'interfaces/facility.dto'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from 'redux/rootReducers'
import { fetchFacility } from 'redux/facilitySlice'
import { Divider, Flex, Heading, Text, View } from '@adobe/react-spectrum'
import HeaderComponent from 'components/templates/Header'
import Pin from '@spectrum-icons/workflow/PinOff'
import Clock from '@spectrum-icons/workflow/Clock'
import Info from '@spectrum-icons/workflow/InfoOutline'
import Home from '@spectrum-icons/workflow/Home'
import Phone from '@material-ui/icons/Phone'

interface DetailPageProps {
  // name: string;
}

const daysEng = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
const daysJap = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜'] as const

const DetailPage: React.FC<DetailPageProps> = () => {

  const styleClasses: { [key: string]: React.CSSProperties } = {
    title: {
      width: '70%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #1bdbf8',
      borderRadius: '12px',
      padding: "12px 0",
      margin: '16px auto',
      boxShadow: 'transparent 0px 0px 10px 8px, transparent 0px 0px 10px 8px, rgba(0, 0, 0, 0.18) 0px 10px 8px'
    },
    contentWrap: {
      margin: '20px',
      border: '2px solid #1bdbf8',
      borderRadius: '12px',
      maxWidth: '600px',
      minWidth: '250px',
      padding: '10px 20px 20px 20px'
    },
    itemHeader: {
      display: 'flex',
      alignItems: 'center',
      margin: '12px 0',
    },
    icon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '12px'
    },
    accessibilitiesList: {
      border: '2px solid #1bdbf8',
      borderRadius: '12px',
      padding: '4px 8px',
      display: 'inline-block',
      margin: '4px'
    }
  }

  const itemContentLeftMargin = "size-500"
  const itemContentBottomMargin = "size-200"

  const { search } = useLocation()

  const [facility, setFacility] = React.useState<Facility>()
  const dispatch = useDispatch()

  const facilities = useSelector((state: RootState) => state.facilities.facilities)

  React.useEffect(() => {
    let urlParamStr = decodeURIComponent(search)
    if (urlParamStr) {
      urlParamStr = urlParamStr.substring(1) //?を除去
      const params: { id: number } = urlParamStr.split('&').reduce((prev: any, current: string) => {
        const temp = current.split('=')
        prev[temp[0]] = temp[1]
        return prev
      }, {})
      if (facilities.length === 0) {
        dispatch(fetchFacility(params.id))
      }
      const selectedFacility = facilities.find(f => f.id === Number(params.id))
      setFacility(selectedFacility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, facilities])

  const ShowBusinessHours = ({ businessHours }: { businessHours: Businesshours }) => {
    return (
      <div>
        {daysEng.map((d, i) => {
          if (!businessHours.open[d]) return (
            <View key={d}>
              {daysJap[i]}: 定休日
            </View>
          )
          return (
            <View key={d}>
              {daysJap[i]}:{businessHours.open[d]} ~ {businessHours.close[d]}
            </View>
          )
        })}
      </div>
    )
  }

  const isBusinessHoursExist = (businessHours: Businesshours) => {
    const openTimes = daysEng.map(d => {
      return businessHours.open[d]
    })
    return openTimes.some(t => t !== '')
  }

  const showURL = (url: string) =>
    <a
      key={url}
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ wordBreak: 'break-all' }}
    >{url}</a>

  const showPhone = (number: string) =>
    <a key={number} href={`tel:${number}`} type="phone" rel="noreferrer">{number}</a>

  const isPriceExist = (priceInfo: string[]) => priceInfo.some(p => p !== "")

  return (
    <div style={{ height: '100%' }}>
      <div style={{
        position: 'sticky',
        top: '0'
      }}>
        <HeaderComponent />
      </div>
      <Flex justifyContent="center">
        <div style={styleClasses.contentWrap}>
          {facility &&
            <React.Fragment>
              <div style={styleClasses.title}>
                {facility.title}
              </div>
              <Heading level={2}>基本情報</Heading>
              <View key={"address"}>
                <div style={styleClasses.itemHeader}>
                  <div style={styleClasses.icon}>
                    <Pin />
                  </div>
                  <Heading level={4} margin={0}>住所</Heading>
                </div>
                <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                  <Text>〒{facility.postalcode} {facility.address}</Text>
                  <div>
                    <a
                      href={`https://www.google.com/maps/search/${facility.title}/`}
                      target="_blank"
                      rel="noreferrer"
                    >GoogleMapsで見る</a>
                  </div>
                </View>
              </View>
              {/* FIXME 営業時間の情報はGoogleMapsから取得したため、間違っている可能性が充分にある */}
              <View key={"businesshours"}>
                <div style={styleClasses.itemHeader}>
                  <div style={styleClasses.icon}>
                    <Clock />
                  </div>
                  <Heading level={4} margin={0}>営業時間</Heading>
                </div>
                <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                  {isBusinessHoursExist(facility.businesshours) ?
                    <ShowBusinessHours businessHours={facility.businesshours} />
                    :
                    <Text>営業時間情報なし</Text>
                  }
                </View>
              </View>
              <View key={"phone"}>
                <div style={styleClasses.itemHeader}>
                  <div style={styleClasses.icon}>
                    <Phone />
                  </div>
                  <Heading level={4} margin={0}>電話番号</Heading>
                </div>
                <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                  {showPhone(facility.phone.replace(/\n.*$/, ''))}
                  {/* FIXME 電話番号カラムの2つ目以降の情報が、GoogleMapsから取得したために、
                怪しいので一旦1つ目のURLのみ表示する */}
                </View>
              </View>
              <View key={"url"}>
                <div style={styleClasses.itemHeader}>
                  <div style={styleClasses.icon}>
                    <Home />
                  </div>
                  <Heading level={4} margin={0}>公式サイト</Heading>
                </div>
                <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                  {/* FIXME 公式サイトカラムの2つ目以降の情報が、GoogleMapsから取得したために、
                怪しいので一旦1つ目のURLのみ表示する */}
                  {showURL(facility.url.replace(/\n.*$/, ''))}
                </View>
              </View>
              <View key={"accessibilities"}>
                <div style={styleClasses.itemHeader}>
                  <div style={styleClasses.icon}>
                    <Info />
                  </div>
                  <Heading level={4} margin={0}>その他情報</Heading>
                </div>
                <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                  {facility.accessibilities.split('\n').map((a, i) => {
                    if (a == null || a === '') return null
                    return <div key={a + i} style={styleClasses.accessibilitiesList}>{a}</div>
                  })}
                </View>
              </View>
              <Divider size="M" />
              <View>
                <Heading level={2}>利用料金</Heading>
                <View>
                  <Heading marginBottom={itemContentBottomMargin} level={4} margin={0}>一般料金</Heading>
                  {isPriceExist(facility.price.split('\n')) ?
                    <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                      {facility.price.split('\n').map(p => <div key={p}>{p}</div>)}
                    </View>
                    :
                    <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                      情報なし
                    </View>
                  }
                </View>
                <View>
                  <Heading marginBottom={itemContentBottomMargin} level={4} margin={0}>手帳提示次</Heading>
                  {isPriceExist(facility.discountedPrice.split('\n')) ?
                    <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                      {facility.discountedPrice.split('\n').map(p => <div key={p}>{p}</div>)}
                    </View>
                    :
                    <View marginStart={itemContentLeftMargin} marginBottom={itemContentBottomMargin}>
                      情報なし
                    </View>
                  }
                </View>
              </View>
            </React.Fragment>
          }
        </div>
      </Flex >
    </div>
  )
}

export default DetailPage