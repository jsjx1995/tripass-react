import React from 'react';
import { ReactComponent as Train } from '_assets/genre_icons/train.svg';
import { ReactComponent as Leisure } from '_assets/genre_icons/leisure.svg';
import { ReactComponent as Culture } from '_assets/genre_icons/culture.svg';
import { ReactComponent as ShrineTemple } from '_assets/genre_icons/shrine.svg';
import { ReactComponent as Sport } from '_assets/genre_icons/sport.svg';
import { ReactComponent as Other } from '_assets/genre_icons/other.svg';
import { Button, Flex, Grid, repeat, SearchField, View } from '@adobe/react-spectrum';
import useReactRouter from 'use-react-router';
import HeaderComponent from 'components/templates/Header';
import { genresJap } from 'uitls/genres';

const TopPage: React.FC = () => {

  // const styleClasses: { [key: string]: React.CSSProperties } = {
  //   all: {
  //     alignItems: 'center',
  //     boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.25)',
  //     borderRadius: '12px',
  //     display: 'flex',
  //     height: '100px',
  //     justifyContent: 'center',
  //     textAlign: 'center',
  //     width: '20%',
  //   }
  // }

  const { history } = useReactRouter();

  const [checkedGenre, setCheckedGenre] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>();
  const icons = [Culture, Train, Leisure, ShrineTemple, Sport, Other];

  const onCheck = (selected: string) => {
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
        <HeaderComponent />
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
            onPress={() => history.push(`/result/${searchValue}/${checkedGenre.length !== 0 ? checkedGenre : 'all'}`)}
          >検索</Button>
        </Flex>
        <Flex direction="column" alignItems="center">
          <div
            style={{
              alignItems: 'center',
              background: checkedGenre.length === 0 ? 'rgba(170, 244, 244, 0.8)' : 'white',
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
            すべて
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
                  <p>{genresJap[index]}</p>
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