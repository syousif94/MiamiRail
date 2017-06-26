import { getXML } from '~/lib/xml';
import moment from 'moment';

const times = [1, 2, 3];

export async function fetchSchedule(id) {
  const schedule = await getXML(
    `https://www.miamidade.gov/transit/mobile/xml/TrainTracker/?StationID=${id}`
  ).then(result => {
    const schedule = {
      nb: [],
      sb: [],
      updatedAt: moment().format('h:mm:ss a'),
    };
    const data = result.TrainTracker.Info[0];
    times.forEach(i => {
      let time = data[`NB_Time${i}`][0];
      if (time.indexOf('*') > -1) {
        return;
      } else {
        time = time.split(' ')[0];
      }
      if (time) {
        schedule.nb.push({
          time,
          arrival: data[`NB_Time${i}_Arrival`][0],
          color: data[`NB_Time${i}_LineID`][0],
        });
      }
    });
    times.forEach(i => {
      let time = data[`SB_Time${i}`][0];
      if (time.indexOf('*') > -1) {
        return;
      } else {
        time = time.split(' ')[0];
      }
      if (time) {
        schedule.sb.push({
          time,
          arrival: data[`SB_Time${i}_Arrival`][0],
          color: data[`SB_Time${i}_LineID`][0],
        });
      }
    });
    return schedule;
  });
  return schedule;
}
