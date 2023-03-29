function DailyDisplay(props) {
  // get days of the week
  console.log("from daily components");
  console.log(props);
  // let dailyArray = [];
  // const getDaysOfWeek = function (daily) {
  //   let d1;
  //   d1 = new Date(daily[1].dt * 1000);
  //   dailyArray[0] = d1.getDay();

  //   switch (dailyArray[0]) {
  //     case 0:
  //       dailyArray[0] = "Sunday";
  //       dailyArray[1] = "Monday";
  //       dailyArray[2] = "Tuesday";
  //       dailyArray[3] = "Wednesday";
  //       dailyArray[4] = "Thursday";
  //       dailyArray[5] = "Friday";
  //       dailyArray[6] = "Saturday";
  //       break;
  //     case 1:
  //       dailyArray[0] = "Monday";
  //       dailyArray[1] = "Tuesday";
  //       dailyArray[2] = "Wednesday";
  //       dailyArray[3] = "Thursday";
  //       dailyArray[4] = "Friday";
  //       dailyArray[5] = "Saturday";
  //       dailyArray[6] = "Sunday";
  //       break;
  //     case 2:
  //       dailyArray[0] = "Tuesday";
  //       dailyArray[1] = "Wednesday";
  //       dailyArray[2] = "Thursday";
  //       dailyArray[3] = "Friday";
  //       dailyArray[4] = "Saturday";
  //       dailyArray[5] = "Sunday";
  //       dailyArray[6] = "Monday";
  //       break;
  //     case 3:
  //       dailyArray[0] = "Wednesday";
  //       dailyArray[1] = "Thursday";
  //       dailyArray[2] = "Friday";
  //       dailyArray[3] = "Saturday";
  //       dailyArray[4] = "Sunday";
  //       dailyArray[5] = "Monday";
  //       dailyArray[6] = "Tuesday";
  //       break;
  //     case 4:
  //       dailyArray[0] = "Thursday";
  //       dailyArray[1] = "Friday";
  //       dailyArray[2] = "Saturday";
  //       dailyArray[3] = "Sunday";
  //       dailyArray[4] = "Monday";
  //       dailyArray[5] = "Tuesday";
  //       dailyArray[6] = "Wednesday";
  //       break;
  //     case 5:
  //       dailyArray[0] = "Friday";
  //       dailyArray[1] = "Saturday";
  //       dailyArray[2] = "Sunday";
  //       dailyArray[3] = "Monday";
  //       dailyArray[4] = "Tuesday";
  //       dailyArray[5] = "Wednesday";
  //       dailyArray[6] = "Thursday";
  //       break;
  //     case 6:
  //       dailyArray[0] = "Saturday";
  //       dailyArray[1] = "Sunday";
  //       dailyArray[2] = "Monday";
  //       dailyArray[3] = "Tuesday";
  //       dailyArray[4] = "Wednesday";
  //       dailyArray[5] = "Thursday";
  //       dailyArray[6] = "Friday";
  //       break;
  //   }
  //   return dailyArray;
  // };
  // getDaysOfWeek(daily);

  // return (
  //   <div>
  //     <p>{day}</p>
  //   </div>
  // );
}

export default DailyDisplay;
