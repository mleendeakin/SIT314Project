
// const client = mqtt.connect("mqtt://broker.hivemq.com:1883");




let levelIDMsg
let roomIDMsg
let lightMsg

function handleClick(levelID, roomID, htmlID)
{
    //Change the light to on
    building.level[levelID].rooms[roomID].lightStatus = !building.level[levelID].rooms[roomID].lightStatus

    //fetch ID's and data for Mqqt message
    levelIDMsg = building.level[levelID].id
    roomIDMsg = building.level[levelID].rooms[roomID].id
    lightMsg = building.level[levelID].rooms[roomID].lightStatus

    console.log(levelIDMsg, roomIDMsg, lightMsg)
    console.log(htmlID)
    handleFetch(levelIDMsg,roomIDMsg,lightMsg,htmlID)



    

}

function handleFetch(levelID, roomID, lightStatus,htmlID)
{
    const data = {levelID, roomID, lightStatus}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }

    fetch('/api', options).then(response => {
        console.log(response);
            //Changing text for click event
        if(building.level[levelID].rooms[roomID].lightStatus)
        {
            document.getElementById(htmlID).innerHTML = 'Light is: On'
        }
        else
        {
            document.getElementById(htmlID).innerHTML = 'Light is: Off'
        }
    })

}

let building = {
    level : [{
        id: 0,
        rooms: [
            {id: 0, lightStatus: false},
            {id: 1, lightStatus: false},
            {id: 2, lightStatus: false},
            {id: 3, lightStatus: false},
            {id: 4, lightStatus: false},
            {id: 5, lightStatus: false},
        ]
    },
    {
        id: 1,
        rooms: [
            {id: 0, lightStatus: false},
            {id: 1, lightStatus: false},
            {id: 2, lightStatus: false},
            {id: 3, lightStatus: false},
            {id: 4, lightStatus: false},
            {id: 5, lightStatus: false},
        ]
    }
    ],

};


// building.level.rooms.forEach(element => {
        //     console.log('Room Number' + element.id)
        //     if(element.lightStatus = true)
        //     {
        //         term.green(element.lightStatus)
        //     }
        //     else
        //     {
        //         term.red(element.lightStatus)
        //     }
        // });