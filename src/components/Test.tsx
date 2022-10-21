import React from 'react'

export default function Test({
    options,
    initialOption,
    open,
    setOpen,
    selectedOption,
    styles
  }) {

    function iziOptions() {
        return options.map((option) => {
          return (
            <div style={styles.iziDropdownOption}>
              {option}
            </div>
          )
        })
      }
    return (
        <div className='iziDropdownContainer' onClick={setOpen}>
            <p className='iziDropdownSelected'>{selectedOption}</p>
            {open &&
                <div className='iziDropdownOptionContainer'>
                    {iziOptions()}
                </div>
            }
        </div>
    )
}
