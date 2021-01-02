import React from 'react';
import { Button, Flex, Form, SearchField, View } from '@adobe/react-spectrum';
import MiniGenreCheck from './MiniCheckGenres';
import { Link } from '@adobe/react-spectrum';
import BackAndroid from '@spectrum-icons/workflow/BackAndroid';
import { Link as RouterLink } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { genres, genresType } from 'uitls/genres';


type SearchBoxWrapProp = {
  searchedPlaceName: string;
  checkedGenres: string[]
}

export interface genresTypeExtended extends genresType {
  checked: boolean;
}

const SearchBoxWrap: React.FC<SearchBoxWrapProp> = (props) => {
  const { history } = useReactRouter();
  const [searchValue, setSearchValue] = React.useState<string>(props.searchedPlaceName);

  const [genreList, setGenreList] = React.useState<genresTypeExtended[]>(genres.map(g => {
    if (props.checkedGenres.some(c => c === 'all') ||
      props.checkedGenres.some(c => c === g.engName)) {
      return {
        engName: g.engName,
        japName: g.japName,
        checked: true,
      }
    } else {
      return {
        engName: g.engName,
        japName: g.japName,
        checked: false,
      }
    }
  }))

  return (
    <React.Fragment>
      <Form>
        <Flex direction="row" alignItems="center">
          <Link>
            <RouterLink to="/">
              <View padding="size-115">
                <BackAndroid />
              </View>
            </RouterLink>
          </Link>
          <SearchField
            value={searchValue}
            aria-label="再検索用サーチバー"
            placeholder="Enter text"
            onChange={setSearchValue}
            marginX="size-200"
          />
          <Button
            onPress={() => {
              const trueCount = genreList.filter(g => g.checked === true).length
              if (trueCount === 6 || trueCount === 0) {
                history.push(`/result?searchValue=${searchValue}&genres=all`)
              } else {
                const checkedGenres = genreList.reduce((prev, current) => {
                  if (current.checked === true) return prev += `${current.engName},`
                  else return prev
                }, '').replace(/,$/, '')
                history.push(`/result?searchValue=${searchValue}&genres=${checkedGenres}`)
              }
            }
            }
            type="button"
            variant="cta"
          >
            再検索
            </Button>
        </Flex>
      </Form>
      <MiniGenreCheck genreList={genreList} setGenreList={setGenreList} />
    </React.Fragment >
  )
}

export default SearchBoxWrap;