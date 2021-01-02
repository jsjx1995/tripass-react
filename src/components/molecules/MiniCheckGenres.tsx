import React from 'react'
import styled from 'styled-components'
import { genres } from 'uitls/genres'
import { genresTypeExtended } from 'components/molecules/SearchBoxWrap'

type GenreCheckboxProps = {
  genreList: genresTypeExtended[]
  setGenreList: (value: genresTypeExtended[]) => void
}

const MiniGenreCheck: React.FC<GenreCheckboxProps> = ({ genreList, setGenreList }) => {
  const [all, setAll] = React.useState<boolean>(genreList.filter(g => g.checked === true).length === 6 ? true : false)

  const checkAll = () => {
    const isCheckedCount = genreList.filter(g => g.checked === true).length
    if (isCheckedCount === 6) {
      setAll(false)
      setGenreList(genres.map(g => {
        return {
          engName: g.engName,
          japName: g.japName,
          checked: false,
        }
      }))
    } else if (isCheckedCount < 6) {
      setAll(true)
      setGenreList(genres.map(g => {
        return {
          engName: g.engName,
          japName: g.japName,
          checked: true,
        }
      }))
    }
  }

  type MiniGenreCheckboxProps = {
    htmlID: string
    valueName: string
    checked: boolean
  }

  const MiniGenreCheckbox: React.FC<MiniGenreCheckboxProps> = ({ htmlID, valueName, checked }) => {
    const handleCheckbox = (e: any) => {
      const changeCheckStatus = genreList
        .slice()
        .map(g => {
          if (e.target.value === g.japName) return {
            engName: g.engName,
            japName: g.japName,
            checked: g.checked ? false : true
          }
          else return {
            engName: g.engName,
            japName: g.japName,
            checked: g.checked
          }
        })
      setGenreList(changeCheckStatus)

      const count = changeCheckStatus.filter(c => c.checked === true).length
      if (count === 6) {
        setAll(true)
      } else if (count < 6) {
        setAll(false)
      }
    }
    return (
      <li>
        <Styled>
          <input
            type="checkbox"
            id={`checkbox${htmlID}`}
            value={valueName}
            checked={checked}
            onChange={handleCheckbox}
          />
          <label htmlFor={`checkbox${htmlID}`}>{valueName}</label>
        </Styled>
      </li>
    )
  }

  return (
    <Ul>
      <li>
        <Styled>
          <input type="checkbox" id={'checkbox-all'} value={'all'}
            onChange={checkAll} checked={all}
          />
          <label htmlFor={`checkbox-all`}>すべて</label>
        </Styled>
      </li>
      {genreList.map((g: genresTypeExtended, i: number) =>
        <MiniGenreCheckbox htmlID={String(i)} valueName={g.japName} key={g.engName} checked={g.checked} />
      )}
    </Ul>

  )
}
export default MiniGenreCheck


const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 10px;
  margin: 0;
  `

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
    padding: 4px 8px;
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
    font-size: 8px;
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