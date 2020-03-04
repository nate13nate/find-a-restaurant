/**
 * This is a table that displays information about the current
 * restaurant.
 */
import React from 'react';
import { connect } from 'react-redux';

import { mapStateToProps, restaurantCategoriesToString } from '../../functions';

class RestaurantInfoTable extends React.Component {
  // takes the hour array from the yelp fusion api and turns it into a jsx element
  // hoursArray - Array; holds information from the yelp fusion api about the restaurant hours
  hoursArrayToJsx(hoursArray) {
    // hours is the hoursArray with two additions: dayString and timeInfoString
    // dayString - the day of the week for the hours that are recorded
    // timeInfoString - the business hours formatted in a user-friendly way
    const hours = hoursArray.map((timeInfo) => {
      let newTimeInfo;

      switch (timeInfo.day) {
        case 0:
          newTimeInfo = { ...timeInfo, dayString: 'Sunday' };
          break;
        case 1:
          newTimeInfo = { ...timeInfo, dayString: 'Monday' };
          break;
        case 2:
          newTimeInfo = { ...timeInfo, dayString: 'Tuesday' };
          break;
        case 3:
          newTimeInfo = { ...timeInfo, dayString: 'Wednesday' };
          break;
        case 4:
          newTimeInfo = { ...timeInfo, dayString: 'Thursday' };
          break;
        case 5:
          newTimeInfo = { ...timeInfo, dayString: 'Friday' };
          break;
        case 6:
          newTimeInfo = { ...timeInfo, dayString: 'Saturday' };
          break;
        default:
          newTimeInfo = { ...timeInfo, dayString: 'ERROR: Day not found' };
      }

      let startingTime = `${newTimeInfo.start.substring(0, 2)}:${newTimeInfo.start.substring(2, 4)}`;
      const startingTimeArray = startingTime.split(':');

      let endingTime = `${newTimeInfo.end.substring(0, 2)}:${newTimeInfo.end.substring(2, 4)}`;
      const endingTimeArray = endingTime.split(':');

      if (parseInt(startingTimeArray[0], 10) > 12) {
        startingTime = `${parseInt(startingTimeArray[0]) - 12}:${startingTimeArray[1]} P.M.`
      } else {
        startingTime += ' A.M.';
      }

      if (parseInt(endingTimeArray[0], 10) > 12) {
        endingTime = `${parseInt(endingTimeArray[0]) - 12}:${endingTimeArray[1]} P.M.`
      } else {
        endingTime += ' A.M.';
      }

      newTimeInfo = { ...newTimeInfo, timeInfoString: `${startingTime} - ${endingTime}` };

      return newTimeInfo;
    });

    const timeInfoJsx = hours.map(hoursInfo => (
      <tr key={hoursInfo.day}>
        <td>{hoursInfo.dayString}</td>
        <td>{hoursInfo.timeInfoString}</td>
      </tr>
    ));

    return (
      <table id='hoursTable'>
        <tbody>
          {timeInfoJsx}
        </tbody>
      </table>
    )
  }

  // renders the table body for the restaurant info table
  renderRestaurantInfo = () => {
    const restaurant = this.props.state.viewedRestaurant; // for more concise code

    return (
      <tbody align='center'>
        <tr>
          <td>Name</td>
          <td>{restaurant.name || 'None Provided'}</td>
        </tr>
        <tr>
          <td>Is It Currently Open?</td>
          <td>{typeof restaurant.hours === 'undefined' ? 'No Information Provided' : ((restaurant.hours[0].is_open_now ? 'Yes' : 'No') || 'None Provided')}</td>
        </tr>
        <tr>
          <td>Restaurant Type</td>
          <td>{typeof restaurant.categories === 'undefined' ? 'None Provided' : restaurantCategoriesToString(restaurant.categories)}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>{restaurant.price || 'None Provided'}</td>
        </tr>
        <tr>
          <td>Rating</td>
          <td>{restaurant.rating || 'None Provided'}</td>
        </tr>
        <tr>
          <td>Hours</td>
          <td>{typeof restaurant.hours === 'undefined' || typeof restaurant.hours[0].open === 'undefined' ? 'None Provided' : this.hoursArrayToJsx(restaurant.hours[0].open)}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            {restaurant.location.display_address[0] || 'None Provided'}
            {typeof restaurant.location.display_address[0] === 'undefined' ? '' : <br />}
            {restaurant.location.display_address[1] || ''}
          </td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>{restaurant.display_phone || 'None Provided'}</td>
        </tr>
        <tr>
          <td>Website</td>
          <td>
            <a href={restaurant.url || null} rel='external noopener noreferrer' target='_blank'>
              {typeof restaurant.url === 'undefined' ? 'None Provided' : restaurant.name}
            </a>
          </td>
        </tr>
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <h2>Restaurant Details</h2>
        <table align='center' id='restaurantInfoTable'>
          {this.renderRestaurantInfo()}
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(RestaurantInfoTable);
