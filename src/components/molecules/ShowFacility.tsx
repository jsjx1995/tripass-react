import React from 'react';
import { Facility } from 'interfaces/facility.dto';
import FacilityCard from 'components/molecules/FacilityCard';
import { Grid, repeat, View } from '@adobe/react-spectrum';
import { Pagination } from 'components/atoms/Pagination';

const ShowFacility: React.FC<{ facilities: Facility[] }> = ({ facilities }) => {

  const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(1);
  const handlePages = (updatePage: number) => setCurrentPageNumber(updatePage);

  // 第1引数の配列を、第2引数の数字ずつにわけた配列にする関数
  const arrayChunk = ([...array], size:number) => {
    return array.reduce((acc, value, index) => index % size ?
      acc :
      [...acc, array.slice(index, index + size)], []);
  }

  const GetCurrentPageFacilities = () => {
    const splitedFacilities = arrayChunk(facilities, 20)
    return (
      <React.Fragment>
        {splitedFacilities[currentPageNumber - 1].map((f: Facility) =>
          <View key={f ? f.id : null}>
            <FacilityCard key={f.id} facility={f} />
          </View>
        )}
      </React.Fragment>
    )
  }

  return (
    <View paddingY="size-200">
      {facilities &&
        <Grid
          columns={repeat('auto-fit', 'size-3600')}
          // autoRows="size-3000"
          justifyContent="center"
          gap="size-100"
        >
          {facilities.length !== 0 &&
            <GetCurrentPageFacilities />
          }
        </Grid>
      }
      {facilities.length !== 0 && (
        <Pagination
          page={currentPageNumber}
          totalPages={arrayChunk(facilities, 20).length}
          handlePagination={handlePages}
        />
      )}
    </View >
  )
}

export default ShowFacility;