import React from 'react';
import { Button, Flex, Form, SearchField, View } from '@adobe/react-spectrum';
import MiniGenreCheck from './MiniCheckGenres';
import { Link } from '@adobe/react-spectrum';
import BackAndroid from '@spectrum-icons/workflow/BackAndroid';
import { Link as RouterLink } from 'react-router-dom';


type SearchBoxWrapProp = {
  searchedPlaceName: string;
  genres: string[]
}

const SearchBoxWrap: React.FC<SearchBoxWrapProp> = (props) => {

  const [searchValue, setSearchValue] = React.useState<string>(props.searchedPlaceName);

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
            value={props.searchedPlaceName}
            aria-label="再検索用サーチバー"
            placeholder="Enter text"
            onChange={setSearchValue}
            marginX="size-200"
          />
          <Button
            onPress={() => {
              console.log(searchValue)
            }}
            type="button"
            variant="cta"
          >
            Save
            </Button>
        </Flex>
      </Form>
      <MiniGenreCheck checkedGenres={props.genres} />
    </React.Fragment >
  )
}

export default SearchBoxWrap;