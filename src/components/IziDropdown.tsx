import React from 'react'
import stylesToCss from 'util/stylesToCss'

export default function IziDropdown({
  options,
  initialOption,
  open,
  setOpen,
  selectedOption,
  styles
}) {

  
  function iziOptions() {
    return options.map((option, index) => {
      return (
        <div key={`dropDownOption${index}`}style={styles.iziDropdownOption}>
          {option}
        </div>
      )
    })
  }


  return (
    <>
      <div style={styles.iziDropdownContainer} onClick={setOpen}>
        <p style={styles.iziDropdownSelected}>{selectedOption}</p>
        {open &&
          <div style={styles.iziDropdownOptionContainer}>
            {iziOptions()}
          </div>
        }
      </div>
      <div style={{ height: "100%", padding: "30px", backgroundColor: "white", color: "black" }}>
        <code>
          {stylesToCss(styles)}
        </code>
        <br /><br />
        <code>
          <div>{`<div className='iziDropdownContainer' onClick={setOpen}>`}</div>
          <div className='indentation1'> {`<p className='iziDropdownSelected'>{selectedOption}</p>`}</div>
          <div className='indentation2'>{`{open &&`}</div>
          <div className='indentation3'> {` <div className='iziDropdownOptionContainer'>`}</div>
          <div className='indentation4'>  {` {iziOptions()} `}</div>
          <div className='indentation3'> {`</div>`} </div>
          <div className='indentation2'>{`}`}</div>
          {`</div>`}
        </code>
      </div>
    </>
  )
}
