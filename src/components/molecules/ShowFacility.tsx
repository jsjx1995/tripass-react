import React from 'react';
import { Facility } from 'interfaces/facility.dto';
import FacilityCard from 'components/molecules/FacilityCard';
import { Grid, repeat, View } from '@adobe/react-spectrum';
import Pagination from 'components/atoms/Pagination';

const ShowFacility: React.FC<{ facilities: Facility[] }> = ({ facilities }) => {

  const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(1);

  const GetCurrentPageFacilities = () => {
    const arrayChunk = ([...array], size = 1) => {
      return array.reduce((acc, value, index) => index % size ? acc : [...acc, array.slice(index, index + size)], []);
    }
    const splitedFacilities = arrayChunk(facilities, 10)
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
          facilitySize={facilities.length}
          setCurrentPageNumber={setCurrentPageNumber}
        />
      )}
    </View >
  )
}

export default ShowFacility;