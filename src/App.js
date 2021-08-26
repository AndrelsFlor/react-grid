import React, { useEffect, useState, useRef } from 'react'
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState([]);
  const [content, setContent] = useState([])
  const [columns, setColumns] = useState([])

  const flag = useRef(0)

  function populateArray() {
    const newArray = []

    for (let i = 1; i <= 11; i++) {
      newArray.push
        (
          {
            heigth: 2.1,
            element: (
              <div className="item" >
                <span>item {i}</span>
              </div>
            )
          }
        )

      setItems(newArray)
    }
  }



  function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }


  // columns
  /**
  * [
  *  [item1, item2, item3],
  *  [item4, item5, item6]
  * ...
  * ]
  */

  // pages
  /**
   * [
   *  [
   *    [item1, item2, item3],
   *    [item4, item5, item6],
   *    [item7, item8, item9],
   *    [item10, item11, item12]
   *  ]
   * ]
   */

  function formatNumber(number) {
    return Math.round(number * 100) / 100;
  }

  function getColumnHeight(column) {
    const columnHeigth = column.reduce((acc, el) => {
      return formatNumber(acc) + formatNumber(el.heigth);
    }, 0);

    console.log('tamanho da coluna ', formatNumber(columnHeigth))

    return formatNumber(columnHeigth);
  }

  function populateColumns() {
    let column = [];
    setColumns([])
    console.log('tamanho do vetor de itens ', items.length);
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const heigth = items[i].heigth;
        console.log(`tamanho do item ${i}`, heigth);

        if (getColumnHeight(column) + heigth <= 21) {
          column.push(items[i]);
        } else {
          // setColumns([...columns, column]);
          columns.push(column)
          console.log('columns => ', columns);
          column = [];
          column.push(items[i]);

          if (i === items.length - 1 && items.length > 0) {
            columns.push(column)
          }
        }
      }
    } else {
      setColumns([])
    }
  }

  function populatePages() {
    if (flag.current <= 2) {
      flag.current += 1;
      // const divisor = Math.ceil(columns.length / 4);
      // console.log(divisor);
      if (columns.length > 4) {
        setPages(chunkArrayInGroups(columns, 4))
      } else {
        setPages([columns])
      }
    }
  }

  function renderPages() {
    const newContent = pages.map(page => {
      return (
        <div className="grid" >
          {
            page.map((column, index) => (
              <div style={{ display: 'flex', aligItems: 'flex-start', flexDirection: 'column', height: '100%', border: '1px solid blue' }}>
                {
                  column.map((columnItem) => {
                    console.log('index+1', index + 1)
                    return (
                      <div style={{ gridColumn: index + 1 }}>
                        {columnItem.element}
                      </div>
                    );
                  })
                }
              </div>
            ))
          }
        </div >
      )
    })

    setContent(newContent)
  }



  useEffect(() => {
    populateArray()
    populateColumns()
    populatePages()
    renderPages()
  }, [pages])

  return (
    <>
      {content}
    </>
  );
}

export default App;
