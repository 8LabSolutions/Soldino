import jsPDF from 'jspdf';
import { store } from '../store/index';
import { BUSINESS, CITIZEN, GOVERN } from '../constants/actionTypes';
import 'jspdf-autotable';

/**
 * @description Get today date with the format YYYY/MM/DD.
 * @returns The function returns the today date.
 */
export function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return(today);
}

/**
 * @description Print a date with the format YYYY/MM/DD.
 * @returns The function returns the date with a new format.
 * @param {*} date
 */
export function printDate(date) {
  var newDate = new Date(date)
  var dd = String(newDate.getDate()).padStart(2, '0');
  var mm = String(newDate.getMonth() + 1).padStart(2, '0');
  var yyyy = newDate.getFullYear();
  newDate = yyyy + '/' + mm + '/' + dd;
  return(newDate);
}

/**
 * @description Get total VAT of a collection of orders called cart.
 * @returns The function returns the total VAT.
 * @param {*} cart
 */
export function getVAT(cart) {
  let totalVAT = 0;
  cart.map (i => {totalVAT += ((i.price*i.VAT)/(+100 + +i.VAT)*i.quantity); return totalVAT})
  return(totalVAT);
}

/**
 * @description Get total net of a collection of orders called cart.
 * @returns The function returns the total net.
 * @param {*} cart
 */
export function getNet(cart) {
  let totalNet = 0;
  cart.map (i => {totalNet += (i.price-((i.price*i.VAT)/(+100 + +i.VAT)))*i.quantity; return totalNet})
  return(totalNet);
}

/**
 * @description Print an address with the format "StreetName StreetNumber, City, PostCode".
 * @returns The function returns a string with the input address with a new format.
 * @param {*} address
 */
export function printShipment(address) {
  return(
    address[0]+" "+address[1]+", "+address[2]+", "+address[3]
  );
}

/**
 * @description Get the name of the logged user.
 * @returns The function returns a string with the logged user name.
 */
export function getName() {
  return(
    store.getState().user.name
  );
}

/**
 * @description Get the details of the logged user.
 * @returns The function returns a string with the logged user surname in case of Citize, otherwise returns the VAT number.
 */
export function getDetails() {
  if(store.getState().user.userType === "CITIZEN"){
    return(
      store.getState().user.surname
    );
  }else{
    return(
      store.getState().user.VATnumber
    );
  }

}

/**
 * @description Get the address of the logged user inserted during signing up.
 * @returns The function returns a string with an array containing the address of the logged user, with the format [StreetName, StreetNumber, City, PostCode].
 */
export function getRegistrationAddress() {
  //get address used during registration from redux store
  return(
    [
      store.getState().user.streetName,
      store.getState().user.streetNumber,
      store.getState().user.district,
      store.getState().user.postCode
    ]
  )
}

/**
 * @description Check if the year is lep.
 * @returns The function returns a boolean value.
 * @param {*} year
 */
Date.isLeapYear = function (year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
}

/**
 * @description Get days in month.
 * @returns The function returns an integer value.
 * @param {*} year
 * @param {*} month
 */
Date.getDaysInMonth = function (year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

/**
 * @description Check if the year is lep.
 * @returns The function returns a boolean value.
 * @param {*} year
 */
Date.prototype.isLeapYear = function () {
  return Date.isLeapYear(this.getFullYear());
}

/**
 * @description Get days in month.
 * @returns The function returns an integer value.
 */
Date.prototype.getDaysInMonth = function () {
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
}

/**
 * @description Add few months to a date.
 * @returns The function returns the new date.
 * @param {*} value of months to add
 */
Date.prototype.addMonths = function (value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
}

/**
 * @description Export a quarter and it's invoices for PDF download functionality.
 * @returns The formatted version of invoices and the related quarter.
 * @param {*} invoices
 * @param {*} quarter
 */
export function ExportPDF(invoices, quarter) {
  var doc = new jsPDF()
  var high = 100
  doc.text(20, 20, periodToDate(quarter.id) + ' resume');
  doc.setLineWidth(0.5);
  doc.line(20, 25, 100, 25);
  doc.text(20, 40, 'VAT status: '+ round(-1*quarter.amount)+ ' CC');
  doc.setLineWidth(0.5);
  doc.line(20, 45, 100, 45);
  invoices.map(i => {
    return(
      doc.autoTable({
        margin: {left: 20},
        startY: 70,
        columnStyles: {0:{ halign: 'center'},1:{ halign: 'center'},2:{ halign: 'center'},3:{ halign: 'center'},7:{ halign: 'center'}},
        headStyles: {cellWidth: 20, halign: 'center', fillColor: [20,29,37]},
        bodyStyles: {cellWidth: 20},
        head: [['Invoice Number', 'Invoice Date', 'Order Date','Total VAT','Seller','Buyer']],
        body: [
            [i.number,printDate(i.date),
              printDate(i.date),
              round((i.VAT/100)*i.net).toFixed(2)+' CC',
              i.sellerName+" "+i.sellerVATNumber,
              i.buyerName
            ]
          ]
      }),
      doc.setFontSize(9),
      doc.text(20, 55, 'Seller\'s wallet address: '+i.sellerAddress),
      doc.text(20, 60, 'Buyer\'s wallet address: '+i.buyerAddress),
      doc.autoTable({
        columnStyles: {1:{ halign: 'center'},2:{ halign: 'center'},3:{ halign: 'center'},4:{ halign: 'center'},5:{ halign: 'center'}},
        headStyles: {cellWidth: 20, halign: 'center', fillColor: [0,128,0]},
        bodyStyles: {cellWidth: 20, valign: 'middle'},
        margin: {left: 20},
        startY: high,
        head: [['Product', 'Net price per unit','VAT %','Quantity','Total Price','Total VAT']],
        body:
          i.products.map(j => {return(
            [j.title,
              round(((j.price*100)/(+j.VAT + +100))).toFixed(2),
              j.VAT,
              j.quantity,
              round(j.price*j.quantity).toFixed(2),
              round(round(j.price*j.quantity)-round(((j.price*100)/(+j.VAT + +100))*j.quantity)).toFixed(2)
            ]
          )})
      }),
      doc.addPage())
  })
  return(
    doc
  )
}

/**
 * @description Check if the logged user is a business user.
 * @returns a boolean value.
 */
export function checkBusiness() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === BUSINESS)
  }else return false;
}

/**
 * @description Check if the logged user is a citizen user.
 * @returns a boolean value.
 */
export function checkCitizen() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === CITIZEN)
  }else return false;
}

/**
 * @description Check if the logged user is the government user.
 * @returns a boolean value.
 */
export function checkGovernment() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === GOVERN)
  }else return false;
}

/**
 * @description Round a number up to two decimal values.
 * @returns a float number.
 * @param {*} numberToRound
 */
export function round(numberToRound) {
  return parseFloat(parseFloat(numberToRound).toFixed(2))
}

/**
 * @description Get a cast to base64 of a file.
 * @returns a base64 value.
 * @param {*} file
 */
export function getBase64(file) {
  return new Promise((resolve)=>{
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result)
    };
    reader.readAsDataURL(file[0]);
  })
}

/**
 * @description Convert a period to a date.
 * @returns A date with the format "XXX-ZZZ YYYY" where XXX-ZZZ is a quarter for example Jan-Mar.
 * @param {*} period
 */
export function periodToDate(period) {
  let month = null;
  let year = parseInt(period.substring(0, 4));
  switch (parseInt(period.substring(5,6))){
    case 1:
      month = "Jan-Mar"
    break;
    case 2:
      month = "Apr-Jun"
    break;
    case 3:
      month = "Jul-Sep"
    break;
    case 4:
      month = "Oct-Dec"
    break;
  }
  return month+" "+year;
}

/**
 * @description Convert a date to a period.
 * @returns A period with the YYYY-I where I is a quarter for example 1 (= first quarter)
 * @param {*} period
 */
export function dateToPeriod(date) {
  let month = null;
  let year = date.substring(8, 12);
  switch (date.substring(0, 7)){
    case "Jan-Mar":
      month = 1
    break;
    case "Apr-Jun":
      month = 2
    break;
    case "Jul-Sep":
      month = 3
    break;
    case "Oct-Dec":
      month = 4
    break;
  }
  return year+"-"+month;
}

/**
 * @description Returns a 'did you know' fact.
 * @returns A random string picked from the list.
 */
export function didYouKnowThat() {
  let didYouKnow = [
    'If you somehow found a way to extract all of the gold from the bubbling core of our lovely little planet, you would be able to cover all of the land in a layer of gold up to your knees.',
    'McDonalds calls frequent buyers of their food "heavy users".',
    'The average person spends 6 months of their lifetime waiting on a red light to turn green.',
    'The largest recorded snowflake was in Keogh, MT during year 1887, and was 15 inches wide.',
    'You burn more calories sleeping than you do watching television.',
    'There are more lifeforms living on your skin than there are people on the planet.',
    'Southern sea otters have flaps of skin under their forelegs that act as pockets. When diving, they use these pouches to store rocks and food.',
    'In 1386 a pig in France was executed by public hanging for the murder of a child.',
    'One in every five adults believe that aliens are hiding in our planet disguised as humans.',
    'If you believe that you’re truly one in a million, there are still approximately 7,184 more people out there just like you.',
    'A single cloud can weight more than 1 million pounds.',
    'A human will eat on average 70 assorted insects and 10 spiders while sleeping.',
    'James Buchanan, the 15th U.S. president continuously bought slaves with his own money in order to free them.',
    'There are more possible iterations of a game of chess than there are atoms in the known universe.',
    'The average person walks the equivalent of three times around the world in a lifetime.',
    'Men are 6 times more likely to be struck by lightning than women.',
    'Coca-Cola would be green if coloring wasn’t added to it.',
    'You cannot snore and dream at the same time.',
    'The world’s oldest piece of chewing gum is over 9,000 years old!',
    'A coyote can hear a mouse moving underneath a foot of snow.',
    'Bolts of lightning can shoot out of an erupting volcano.',
    'New York drifts about one inch farther away from London each year.',
    'A U.S. dollar bill can be folded approximately 4,000 times in the same place before it will tear.',
    'A sneeze travels about 100 miles per hour.',
    'Earth has traveled more than 5,000 miles in the past 5 minutes.',
    'It would take a sloth one month to travel one mile.',
    '10% of the World’s population is left handed.',
    'A broken clock is right two times every day.',
    'According to Amazon, the most highlighted books on Kindle are the Bible, the Steve Jobs biography, and The Hunger Games.',
    'Bob Marley’s last words to his son before he died were "Money can’t buy life".',
    'A mole can dig a tunnel that is 300 feet long in only one night.',
    'A hippo’s wide open mouth is big enough to fit a 4-foot-tall child in.',
    'Chewing gum while you cut an onion will help keep you from crying.',
    'If you were to stretch a Slinky out until it’s flat, it would measure 87 feet long.',
    'Al Capone’s business card said he was a used furniture dealer',
    'There are more collect calls on Father’s Day than on any other day of the year.',
    'Banging your head against a wall burns 150 calories an hour.',
    '95% of people text things they could never say in person.',
    'A crocodile can’t poke its tongue out.',
    'It is physically impossible for pigs to look up into the sky.',
    'Guinness Book of Records holds the record for being the book most often stolen from Public Libraries.',
    'Drying fruit depletes it of 30-80% of its vitamin and antioxidant content',
    'A 2010 study found that 48% of soda fountain contained fecal bacteria, and 11% contained E. Coli.',
    '9 out of 10 Americans are deficient in Potassium.',
    'Blueberries will not ripen until they are picked.',
    'About 150 people per year are killed by coconuts.',
    'Ketchup was used as a medicine back in the 1930’s.',
    'Honey never spoils.',
    'About half of all Americans are on a diet on any given day.',
    'A hardboiled egg will spin, but a soft-boiled egg will not.',
    'Avocados are poisonous to birds.',
    'Chewing gum burns about 11 calories per hour.',
    'The number of animals killed for meat every hour in the U.S. is 500,000.',
    'If you try to suppress a sneeze, you can rupture a blood vessel in your head or neck and die.',
    'Celery has negative calories! It takes more calories to eat a piece of celery than the celery has in it to begin with. It’s the same with apples!',
    'More people are allergic to cow’s milk than any other food.',
    'Only 8% of dieters will follow a restrictive weight loss plan (such as military diet, egg diet etc.)',
    'Coconut water can be used as blood plasma.',
    'un-Facts-about-you55. The word "gorilla" is derived from a Greek word meaning, "A tribe of hairy women".',
    'Prisoners in Canadian war camps during WWII were treated so well, that a lot of them didn’t’ want to leave when the war was over.',
    'Gorillas burp when they are happy',
    'In New York, it is illegal to sell a haunted house without telling the buyer.',
    'In 2006 someone tried to sell New Zealand on eBay. The price got up to $3,000 before eBay shut it down.',
    'It is considered good luck in Japan when a sumo wrestler makes your baby cry.',
    'A man from Britain changed his name to Tim Pppppppppprice to make it harder for telemarketers to pronounce.',
    'A woman from California once tried to sue the makers of Cap’n Crunch, because the Crunch Berries contained "no berries of any kind".',
    'Apple launched a clothing line in 1986. It was described as a "train wreck" by others.',
    'In Japan, crooked teeth are considered cute and attractive.',
    'A Swedish woman lost her wedding ring, and found it 16 years later- growing on a carrot in her garden.',
    'Donald duck comics were banned from Finland because he doesn’t wear pants.',
    'The chance of you dying on the way to get lottery tickets is actually greater than your chance of winning.',
    'Cherophobia is the fear of fun.',
    'The toothpaste "Colgate" in Spanish translates to "go hang yourself"',
    'Pirates wore earrings because they believed it improved their eyesight.',
    'Human thigh bones are stronger than concrete.',
    'Cockroaches can live for several weeks with their heads cut off, because their brains are located inside their body. They would eventually die from being unable to eat.',
    'Scientists have tracked butterflies that travel over 3,000 miles.',
    'To produce a single pound of honey, a single bee would have to visit 2 million flowers.',
    'The population is expected to rise to 10.8 billion by the year 2080.',
    'You breathe on average about 8,409,600 times a year',
    'More than 60,000 people are flying over the United States in an airplane right now.',
    'Hamsters run up to 8 miles at night on a wheel.',
    'A waterfall in Hawaii goes up sometimes instead of down.',
    'A church in the Czech Republic has a chandelier made entirely of human bones.',
    'Under the Code of Hammurabi, bartenders who watered down beer were punished by execution.',
    'Our eyes are always the same size from birth, but our nose and ears never stop growing.',
    'During your lifetime, you will produce enough saliva to fill two swimming pools.',
    'You are 1% shorter in the evening than in the morning',
    'The elephant is the only mammal that can’t jump!',
    'Most dust particles in your house are made from dead skin!',
    'If 33 million people held hands, they could make it all the way around the equator.',
    'Earth is the only planet that is not named after a god.',
    'The bloodhound is the only animal whose evidence is admissible in court.',
    'You are born with 300 bones, but by the time you are an adult you only have 206.',
    'A ten-gallon hat will only hold ¾ of a gallon.',
    'Just like fingerprints, everyone has different tongue prints.',
    'ATM’s were originally thought to be failures, because the only users were prostitutes and gamblers who didn’t want to deal with tellers face to face.',
    'Of all the words in the English language, the word "set" has the most definitions. The word "run" comes in close second.',
    'A "jiffy" is the scientific name for 1/100th of a second.',
    'One fourth of the bones in your body are located in your feet',
    '111,111,111 X 111,111,111 = 12,345,678,987,654,321',
    'Blue-eyed people tend to have the highest tolerance of alcohol.',
    'A traffic jam lasted for more than 10 days, with cars only moving 0.6 miles a day.',
    'The tongue is the strongest muscle in the body.',
    'Every year more than 2500 left-handed people are killed from using right-handed products.',
    'More than 50% of the people in the world have never made or received a telephone call.',
    'The cigarette lighter was invented before the match.',
    'Sea otters hold hands when they sleep so that they do not drift apart.',
    'The Golden Poison Dart Frog’s skin has enough toxins to kill 100 people.',
    'The male ostrich can roar just like a lion.',
    'Mountain lions can whistle.',
    'The giraffe’s tongue is so long that they can lick the inside of their own ear.',
    'Cows kill more people than sharks do.',
    'Cats have 32 muscles in each of their ears.',
    'Butterflies taste their food with their feet.',
    'A tarantula can live without food for more than two years.',
    'The tongue of a blue whale weighs more than most elephants!',
    'Ever wonder where the phrase "It’s raining cats and dogs" comes from? In the 17th century many homeless cats and dogs would drown and float down the streets of England, making it look like it literally rained cats and dogs.',
    'It takes about 3,000 cows to supply enough leather for the NFL for only one year.',
    'Male dogs lift their legs when they are urinating for a reason. They are trying to leave their mark higher so that it gives off the message that they are tall and intimidating.',
    'A hummingbird weighs less than a penny.',
    'An ostrich’s eye is bigger than its brain',
    'Dogs are capable of understanding up to 250 words and gestures and have demonstrated the ability to do simple mathematical calculations.',
    'A sheep, a duck and a rooster were the first passengers in a hot air balloon.',
    'Birds don’t urinate.',
    'A flea can jump up to 200 times its own height. That is the equivalent of a human jumping the Empire State Building.',
    'There are 5 temples in Kyoto, Japan that have blood stained ceilings. The ceilings are made from the floorboards of a castle where warriors killed themselves after a long hold-off against an army. To this day, you can still see the outlines and footprints.',
    'There is a snake, called the boomslang, whose venom causes you to bleed out from every orifice on your body. You may even turn blue from internal bleeding, and it can take up to 5 days to die from the bleeding.',
    'A ball of glass will bounce higher than a ball of rubber.',
    'Saturn’s density is low enough that the planet would float in water.',
    '68% of the universe is dark energy, and 27% is dark matter; both are invisible, even with our powerful telescopes. This means we have only seen 5% of the universe from earth.',
    'The founders of Google were willing to sell Google for $1 million to Excite in 1999, but Excite turned them down. Google is now worth $527 Billion.',
    'In the past 20 years, scientists have found over 1,000 planets outside of our solar system.',
    'There are 60,000 miles of blood vessels in the human body.',
    'If a pregnant woman has organ damage, the baby in her womb sends stem cells to help repair the organ.',
    'If you started with $0.01 and doubled your money every day, it would take 27 days to become a millionaire.',
    'Only one person in two billion will live to be 116 or older.',
    'A person can live without food for about a month, but only about a week without water.',
    'the amount of water in your body is reduced by just 1%, you’ll feel thirsty.',
    'it’s reduced by 10%, you’ll die.',
    'On average, 12 newborns will be given to the wrong parents daily.',
    'You can’t kill yourself by holding your breath.',
    'Human birth control pills work on gorillas.',
    'There are no clocks in Las Vegas gambling casinos.',
    'Beetles taste like apples, wasps like pine nuts, and worms like fried bacon.',
    'What is called a "French kiss" in the English-speaking world is known as an "English kiss" in France.',
    'Months that begin on a Sunday will always have a "Friday the 13th".',
    'The placement of a donkey’s eyes in its’ heads enables it to see all four feet at all times!',
    'Some worms will eat themselves if they can’t find any food!',
    'Dolphins sleep with one eye open!',
    'It is impossible to sneeze with your eyes open.',
    'In France, it is legal to marry a dead person.',
    'Russia has a larger surface area than Pluto.',
    'There’s an opera house on the U.S.–Canada border where the stage is in one country and half the audience is in another.',
    'The harder you concentrate on falling asleep, the less likely to fall asleep.',
    'You can’t hum while holding your nose closed.',
    'Women have twice as many pain receptors on their body than men. But a much higher pain tolerance.',
    'There are more stars in space than there are grains of sand on every beach in the world.',
    'For every human on Earth there are 1.6 million ants.',
    'The total weight of all those ants, however, is about the same as all the humans.',
    'On Jupiter and Saturn it rains diamonds.'
    ]
    return "DID YOU KNOW THAT: "+didYouKnow[Math.floor(Math.random() * didYouKnow.length)]
}