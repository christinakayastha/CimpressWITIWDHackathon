import React from 'react'
import {Recipe, RecipeToolBar} from '../../components'
import styles from './styles.css' 

// Notes: http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable

const RecipeEditor = React.createClass({
  render: function() {
    return (
      <div className={styles.recipe}>
        <Recipe />

        <RecipeToolBar />
      
      </div>
    )
  }
})

export default RecipeEditor;