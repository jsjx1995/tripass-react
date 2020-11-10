import React from 'react';
import { ReactComponent as Train } from '../_assets/genre_icons/train.svg';
import { ReactComponent as Leisure } from '../_assets/genre_icons/leisure.svg';
import { ReactComponent as Culture } from '../_assets/genre_icons/culture.svg';
import { ReactComponent as Shrine } from '../_assets/genre_icons/shrine.svg';
import { ReactComponent as Hotel } from '../_assets/genre_icons/hotel.svg';
import { ReactComponent as Sport } from '../_assets/genre_icons/sport.svg';
import { ReactComponent as Parking } from '../_assets/genre_icons/parking.svg';
import { ReactComponent as Other } from '../_assets/genre_icons/other.svg';
import { ReactComponent as Logo } from '../_assets/tripass-logo.svg';
import { Button, Flex, Grid, Header, Heading, repeat, SearchField, Text, View } from '@adobe/react-spectrum';
import useReactRouter from 'use-react-router';

const TopPage: React.FC = () => {
  const { history } = useReactRouter();

  const [checkedGenre, setCheckedGenre] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>();
  const icons = [Train, Leisure, Culture, Shrine, Hotel, Sport, Parking, Other];
  const textArray = ['交通機関', 'レジャー施設', '文化施設', '神社仏閣', '宿泊施設', 'スポーツ施設', '駐車場', 'その他'];

  const onCheck = (selected: string) => {
    // const selected: string = Icon.render.name.replace('Svg', '');
    // const selected: string = Icon.render.name.replace('Svg', '');
    const newSelectedGenre = checkedGenre.slice();
    if (newSelectedGenre.includes(selected)) {
      const deleteIndex = newSelectedGenre.indexOf(selected);
      if (deleteIndex > -1) {
        newSelectedGenre.splice(deleteIndex, 1);
      }
    } else {
      newSelectedGenre.push(selected);
    }
    setCheckedGenre(newSelectedGenre);
  };

  return (
    <React.Fragment>
      <Flex direction="column" gap="size-100" minHeight="100vh">
        <Header>
          <View backgroundColor="gray-50">
            {/* 文言を中央寄せ */}
            <Flex direction="row" justifyContent="left" alignItems="center">
              {/* h2と同等 */}
              <Heading level={2} >
                <Logo />
                <Text>TRIPASS</Text>
              </Heading>
            </Flex>
          </View>
        </Header>
        <Flex justifyContent="center">
          <SearchField
            placeholder="施設名・場所を入力してください"
            value={searchValue}
            onChange={setSearchValue}
            marginEnd="size-200"
            width="size-3600"
          />
          <Button
            variant="cta"
            onPress={() => history.push(`/result/${searchValue}/${checkedGenre}`)}
          >検索</Button>
        </Flex>
        <Flex direction="column" alignItems="center">
          <div
            style={{
              alignItems: 'center',
              // border: '1px solid black',
              boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.25)',
              borderRadius: '12px',
              display: 'flex',
              height: '100px',
              justifyContent: 'center',
              textAlign: 'center',
              width: '20%',
            }}
            onClick={() => {
              if (checkedGenre.length !== 8) {
                setCheckedGenre(icons.reduce(
                  (prev: string[], current: any) => {
                    prev.push(current.render.name.replace('Svg', '').toLowerCase());
                    return prev;
                  }, []));
              } else {
                setCheckedGenre([]);
              }
            }}
          >
            {/* <a > */}
            <label htmlFor="all">すべて</label>
            <input
              type="checkbox"
              style={{ display: "none" }}
              id="all"
              onClick={(e: any) => console.log(e.target)} />
            {/* </a> */}
          </div>
          <Grid
            justifyContent="center"
            columns={repeat('auto-fit', 'size-2000')}
            autoRows="size-2000"
            width="100%"
            maxWidth="640px"
          >
            {icons.map((Icon: any, index: number) => (
              <View justifySelf="center" alignSelf="center" key={Icon.render.name}>
                <div
                  style={{
                    alignItems: 'center',
                    background: checkedGenre.some(g => g === Icon.render.name.replace('Svg', '').toLowerCase()) ? 'rgba(170, 244, 244, 0.8)' : 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '140px',
                    textAlign: 'center',
                    width: '150px',
                  }}
                  onClick={() => onCheck(Icon.render.name.replace('Svg', '').toLowerCase())}
                >
                  <Icon />
                  <p>{textArray[index]}</p>
                  {/* <label htmlFor={Icon.render.name} aria-label={Icon.render.name}>
                    <Icon />
                    <p>{textArray[index]}</p>
                  </label>
                  <input
                    aria-label={Icon.render.name}
                    type="checkbox"
                    style={{ display: "none" }}
                    id={Icon.render.name}
                    onClick={(e: any) => { }}
                  /> */}
                </div>
              </View>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </React.Fragment >
  );
};
export default TopPage;;