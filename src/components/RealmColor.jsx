import PropTypes from 'prop-types'

const RealmColor = ({ color }) => {
  return (
    <section className='h-3 w-3 rounded' style={ { backgroundColor: color } }></section>
  )
}

RealmColor.propTypes = {
  color: PropTypes.string.isRequired,
}

export default RealmColor
