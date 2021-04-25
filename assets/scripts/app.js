const attackvalue = 12 ;
const MAXlife = 120 ;
const haelva = 10
let plyhealth = MAXlife ;
let moshealth = MAXlife
let hasbl = true

let log_file = []

//adjustHealthBars(MAXlife)
function resethealth ()
{
    adjustHealthBars(MAXlife)
    plyhealth = MAXlife ;
    moshealth = MAXlife ;
}

function writinglog(even, val = 0, haswon = 0 , winner = "Me")
{
    let enteries ={
        Event : even,
        Value : val,
        PlayerHealth : plyhealth,
        MonsterHealth : moshealth
    }
    if (haswon)
    {
        enteries.Winner = winner
    }
    log_file.push(enteries)
}

function mosattcheck(att)
{
    //console.log(plyhealth)
    pdmg = dealPlayerDamage(att)
    plyhealth -= pdmg;
    writinglog('Monster Attacked' , pdmg)
    //console.log(plyhealth);
    //console.log(moshealth);
    // console.log(log_file)
    if (plyhealth <= 0 && hasbl)
    {
        hasbl = false
        removeBonusLife()
        alert("50% health recovered")
        setPlayerHealth(MAXlife/2)
        plyhealth = MAXlife/2
        writinglog('Half Life Gained' , MAXlife/2)
    }
    if (moshealth <= 0 && plyhealth > 0)
    {
        alert("You Won")
        writinglog('Winner Announced' , 0 , 1 , 'You')
        resethealth()
        return
    }
    else if (plyhealth <= 0 && moshealth > 0 )
    {
        alert("You Lost")
        writinglog('Winner Announced' , 0 , 1 , 'Monster')
        resethealth()
        return
    }
    else if (plyhealth <= 0 && moshealth <= 0)
    {
        alert(" Draw ")
        writinglog('Draw' , 0 , 1 , '404')
        resethealth()
        return   
    }
}

function attackpart(mode)
{
    let at = 10
    if (mode == "AA")
        at = attackvalue
    else 
        at = 2 * attackvalue
    let mdmg = dealMonsterDamage(at)
    moshealth -= mdmg ;
    writinglog('Player Attacked' , mdmg)
    mosattcheck((3/2) * at)
}

function atat()
{attackpart("AA")}

function stat()
{attackpart("AAA")}

function healfun()
{
    let healValue
    if(plyhealth >= MAXlife - haelva)
    healValue = MAXlife - plyhealth
    else
    {
        healValue = haelva
    }
    increasePlayerHealth(healValue)
    plyhealth += healValue;
    mosattcheck(1.5 * attackvalue)
}

function showlog()
{
    console.clear()
    alert('Check the console')
    console.log(log_file)
}

resethealth ()
attackBtn.addEventListener("click",atat)
strongAttackBtn.addEventListener("click",stat)
healBtn.addEventListener('click', healfun)
logBtn.addEventListener('click',showlog)