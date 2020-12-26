import React from 'react';
import styled from 'styled-components';
import { genres, genresType } from 'uitls/genres';


interface genresTypeExtended extends genresType {
  checked: boolean;
}

type GenreCheckboxProps = {
  checkedGenres: string[];
}

const MiniGenreCheck: React.FC<GenreCheckboxProps> = (props) => {
  const [genreList, setGenreList] = React.useState<genresTypeExtended[]>(genres.map(g => {
    return {
      engName: g.engName,
      japName: g.japName,
      checked: false,
    }
  }))

  React.useEffect(() => {
    if (!props.checkedGenres.includes('all')) {
      // const newGenreList = props.checkedGenres.map(checked => {
      const newGenreList = genreList.reduce(
        (prev: genresTypeExtended[], current: genresTypeExtended) => {
          prev.push({
            engName: current.engName,
            japName: current.japName,
            checked: props.checkedGenres.some(checked => checked === current.engName) ? true : false
          })
          return prev;
        }, [])
      // })
      setGenreList(newGenreList)
    } else {
      const allChecked = genreList.reduce(
        (prev: genresTypeExtended[], current: genresTypeExtended) => {
          prev.push({
            engName: current.engName,
            japName: current.japName,
            checked: true,
          })
          return prev;
        }, [])
      setGenreList(allChecked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.checkedGenres])

  type MiniGenreCheckboxProps = {
    htmlID: string;
    valueName: string;
    checked: boolean;
  }

  const MiniGenreCheckbox: React.FC<MiniGenreCheckboxProps> = ({ htmlID, valueName, checked }) => {
    const handleCheckbox = (e: any) => {
      const changeCheckStatus = genreList
        .slice()
        .reduce((prev: genresTypeExtended[], current: genresTypeExtended) => {
          if (e.target.value === current.japName) {
            prev.push({
              engName: current.engName,
              japName: current.japName,
              checked: current.checked ? false : true,
            })
          } else {
            prev.push({
              engName: current.engName,
              japName: current.japName,
              checked: current.checked,
            })
          }
          return prev;
        }, []);
      setGenreList(changeCheckStatus)
    }
    return (
      <li>
        <Styled>
          <input type="checkbox" id={`checkbox${htmlID}`} value={valueName}
            onChange={handleCheckbox} checked={checked}
          />
          <label htmlFor={`checkbox${htmlID}`}>{valueName}</label>
        </Styled>
      </li>
    )
  }

  return (
    <Ul>
      {genreList.map((g: genresTypeExtended, i: number) =>
        <MiniGenreCheckbox htmlID={String(i)} valueName={g.japName} key={g.engName} checked={g.checked} />
      )}
    </Ul>

  )
}
export default MiniGenreCheck;


const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 20px;
  `;

// チェックボックスのスタイル
const Styled = styled.div`
  display: inline-block;
  > input {
    opacity: 0;
  }
  > label {
    background-color: rgba(255, 255, 255, .9);
    border: 2px solid rgba(139, 139, 139, .3);
    border-radius: 25px;
    color: #adadad;
    cursor: pointer;
    display: inline-block;
    margin: 3px 0px;
    padding: 8px 12px;
    transition: all .2s;
    user-select: none;
    white-space: nowrap;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  > label::before {
    content: "＋";
    display: inline-block;
    font-family: "Font Awesome 5 Free";
    font-size: 12px;
    font-style: normal;
    font-variant: normal;
    font-weight: 900;
    padding: 2px 6px 2px 2px;
    text-rendering: auto;
    transition: transform .3s ease-in-out;
    -webkit-font-smoothing: antialiased;
  }
  > input[type="checkbox"]:checked + label::before {
    content: "✔";
    transform: rotate(-360deg);
    transition: transform .3s ease-in-out;
  }
  > input[type="checkbox"]:checked + label {
    background-color: #12bbd4;
    border: 2px solid #1bdbf8;
    color: #fff;
    transition: all .2s;
  }
  > input[type="checkbox"] {
    display: absolute;
  }
  > input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }
  > input[type="checkbox"]:focus + label {
    border: 2px solid #e9a1ff;
  }
`