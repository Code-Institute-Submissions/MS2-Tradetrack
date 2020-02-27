# MS2-Tradetrack

# Trade Journal & Market Analysis

This website serves as a tool that traders can use to dynamically keep track of their daily trading goals. The landing page greets the user with the time and a greeting based on whether it is morning, afternoon or night - with the functionality of adding their name and profit target % below. Traders can use the interactive TradingView chart to conduct technical analysis, note down their daily profit/loss, describe their strategy and view a brief market overview. 

## UX

- As a user type, I want to quickly be able to view market data in new tabs and track my trading progress all on one site.

- As a user type, I want to able to note down my PnL in my browser.

- As a user type, I want to able to journal my daily progress and strategy to make better decisions whilst trading.

## Features


- The landing page - Users are greeted with a message and the time, and can also display/enter their own name and trade profit target. Data is stored in the browsers local memory.

- Pnl Tracker - This feature allows users to calculate their daily profit and loss and view their trade history. Data is stored in the browsers local memory and can be deleted through the UI.

- Trade journal and strategy - This feature allows users to note down their trade ideas for future trades or previous trades and is displayed in a table, where users can also remove ideas from the browser local memory through the UI. 

- TradingView Widgets
    	
        - Market Banner
        - Interactive Chart
        - Market overview
        - Economic Calendar
        - Forex HeatMap





## Technologies Used

- HTML 5
- JS
- Bootstrap CSS Framework 4.3.1
- CSS 3



## Testing

Testing has been conducted on all features that use the browsers local memory to save data. - By imputing data and refreshing the page to check if content is stored.

To test how responsive the website is, I used a variety tools and devices to make sure that there are no visual bugs.

1. Web Browsers 
    
    1. Google Chrome /DevTools
    2. Mozilla Firefox
    3. Safari - Background-attachment: fixed; property still needs to be changed to display fixed images correctly

2. Mobile Devices
    
    1. Iphone 4, 5, 6, 7, 8, X - Responsive bug with extra padding fixed with adding margin-left/right: 0px!important; to row and container-fluid class
    2. Ipad/Pro
    3. Surface pro
    4. Samsung Galaxy S5

    
3. Desktop Resolution & Aspect Ratio
    - Different display types and aspect ratios affected the display of name and icons on the landing page. 
   
    - 1366x768	16:9
    - 1920x1080 16:9
    - 1280x800	8:5


## Deployment

This project uses Github Pages for deployment and hosting. Every time the master branch has a new commit, the page will automatically update.



## Credits



### Content
All market data provided by Tradingview. 

Informational content on this site for example purposes only and was sourced from https://smbtraining.com/ and https://www.investopedia.com/

### Acknowledgements

Traversy Media Youtube tutorials - https://www.youtube.com/user/TechGuyWeb Inspiration and features addapted from his tutorials
