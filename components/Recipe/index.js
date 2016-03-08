import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import { update, updateEditing } from '../../actions'
import ContentEditable from 'react-contenteditable'
import styles from './styles.css'

const Recipe = React.createClass({
  // TODO: Move this to a different state
  showEditImage: function(evt) {
    const {updateEditing} = this.props;
    updateEditing(evt.currentTarget.id, true)
  },

  hideEditImage: function(evt) {
    const {updateEditing} = this.props;
    updateEditing(evt.currentTarget.id, false)
  },

  update: function(evt) {
    const {update} = this.props;
    update(evt.currentTarget.id, evt.target.value)
  },

  render: function() {
    const imagePath = window.location.origin + "/imageUploads/"
    const {recipe, editing} = this.props;
    const disabled = false;
    let EditImage = React.createClass({
        render: function() {
            return (
                <div className={styles.editImage}>
                    <Glyphicon glyph="camera" className={styles.camera}/>
                    <Glyphicon glyph="plus-sign" className={styles.zoomIn} onClick=""/>
                    <Glyphicon glyph="minus-sign" className={styles.zoomOut}/>
                </div>
            );
        }
    });

    return (
      <div className={styles.recipe}>
        <div className={styles.content}>
          <div id="foodPictureContainer" className={styles.imageContainer + " " + styles.editable} onMouseEnter={this.showEditImage}  onMouseLeave={this.hideEditImage}>
            <img id="foodPicture" className={styles.foodPicture} src={imagePath + recipe.foodPicture.src} style={recipe.foodPicture.style} />
            {editing.foodPictureContainer ? <EditImage /> : null}
          </div>
          <ContentEditable id="title" className={styles.title} html={recipe.title} disabled={disabled} onChange={this.update} />
          <ContentEditable id="caption"  className={styles.caption} html={recipe.caption} disabled={disabled} onChange={this.update} />
          <div className={styles.instructions}> 
            <div className={styles.ingredients}>
              <ContentEditable id="ingredients" className={styles.ingredientsList} html={recipe.ingredients} disabled={disabled} onChange={this.update} />
            </div>
            <div className={styles.directions}>
              <ContentEditable id="directions" className={styles.directionsList} html={recipe.directions} disabled={disabled} onChange={this.update} />
            </div>
          </div>
        </div>
        <div className={styles.profile}>
          <div id="profilePictureContainer" className={styles.imageContainer + " " + styles.editable} onMouseEnter={this.showEditImage}  onMouseLeave={this.hideEditImage}>
            <img id="profilePicture" className={styles.profilePicture} src={imagePath + recipe.profilePicture.src} style={recipe.profilePicture.style}  />
            {editing.profilePictureContainer ? <EditImage /> : null}
          </div>
          <ContentEditable id="fullName" className={styles.profileName} html={recipe.fullName} disabled={disabled} onChange={this.update} />
          <ContentEditable id="company"  className={styles.profileCompany} html={recipe.company} disabled={disabled} onChange={this.update} />
          <ContentEditable id="companyLocation"  className={styles.profileCompanyLocation} html={recipe.companyLocation} disabled={disabled} onChange={this.update} />
          <ContentEditable  id="profileSummary" className={styles.profileSummary} html={recipe.profileSummary} disabled={disabled} onChange={this.update} />
        </div>
      </div>
    )
  }
})


Recipe.propTypes = {
  update: PropTypes.func.isRequired,
  updateEditing: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe.present,
    editing: state.editing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ update, updateEditing }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe)